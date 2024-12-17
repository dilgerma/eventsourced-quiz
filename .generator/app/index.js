var Generator = require('yeoman-generator');
var slugify = require('slugify')

var config = {}

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        /**
         * Load the exported config json from the
         * current Working Directory
         */
        config = require(this.env.cwd + "/config.json");
    }


    generateCommandHandlers() {
        let commands = config.slices.flatMap(slice => slice.commands)

        /**
         * go over all commands and dynamically build imports.
         */
        let commandImports = commands.map(command => {
            let commandTitle = slugify(command.title, "")
            return `import {${commandTitle}} from "@/app/api/commands/${commandTitle}";`
        }).join("\n")

        /**
         * render command handlers
         */
        let commandHandlers = commands.map(command => {
            let commandTitle = slugify(command.title, "")

            /**
             * for each command, find the outbound dependencies
             */
            let inboundEvents = command.dependencies.filter(dep =>
                dep.type === 'OUTBOUND' && dep.elementType === 'EVENT')
                .map(eventDep => config.slices.flatMap(
                    slice => slice.events)
                    .find(event => event.id === eventDep.id))

            /**
             * build the result array for each command
             */
            let resultEventArray = inboundEvents.map(event => {
                let eventTitle = slugify(event.title, "")
                return `{
                    type:'${eventTitle}',
                    data: {
                        ${event.fields.map(field => {
                            return `${field.name}: command.${field.name}`
                        }).join(",\n")}
                    }
                }`
            }).join(",\n")

            return `
            let handle${commandTitle} = (command: ${commandTitle}): QuizEvents[] => {
                return [${resultEventArray}]
            }`
        }).join("\n")

        this.fs.copyTpl(
            this.templatePath(`src/components/QuizApi.ts.tpl`),
            this.destinationPath(`./app/api/QuizApi.ts`),
            {
                //vars
                commandImports: commandImports,
                createQuizCommandHandler: commandHandlers
            }
        )

    }

    renderUnionTypes(){
        let events = config.slices.flatMap(slice => slice.events)

        let eventImports = events.map(event => {
            let eventTitle = slugify(event.title, "")
            return `import {${eventTitle}} from "@/app/api/events/${eventTitle}";`
        }).join("\n")

        // render Event Union Type
        var eventUnionTypes = config.slices.flatMap(slice => slice.events).map((event) => {
            return slugify(event.title, "")
        }).join(" | \n");


        this.fs.copyTpl(
            this.templatePath(`src/components/EventUnion.ts.tpl`),
            this.destinationPath(`./app/api/events/QuizEvents.ts`),
            {
                //vars
                _eventImports: eventImports,
                _eventUnionTypes: eventUnionTypes
            }
        )
    }


    /**
     * this runs automatically, since it does not start with "_"
     */
    createElements() {

        // render events
        let events = config.slices.flatMap(slice => slice.events)
        events.forEach((event) => {
            if (event) {

                let eventName = slugify(event.title, "")
                this.fs.copyTpl(
                    this.templatePath(`src/components/Event.ts.tpl`),
                    this.destinationPath(`./app/api/events/${eventName}.ts`),
                    {
                        //vars
                        _name: eventName,
                        _fields: renderFields(event)
                    }
                )
            }
        });


        // render commands
        config.slices.flatMap(slice => slice.commands).forEach((command) => {
            if (command) {

                let commandName = slugify(command.title, "")
                this.fs.copyTpl(
                    this.templatePath(`src/components/Command.ts.tpl`),
                    this.destinationPath(`./app/api/commands/${commandName}.ts`),
                    {
                        //vars
                        _name: commandName,
                        _fields: renderFields(command)
                    }
                )
            }
        });
    }
}

const renderFields = (element) => {
    return element.fields ? `
${element.fields?.map(item => {
        return `\t${item.name}:${typeMapping(item.type, item.cardinality)}`
    }).join(",\n")}    
    ` : ''
}

const typeMapping = (fieldType, fieldCardinality) => {
    var fieldType;
    switch (fieldType?.toLowerCase()) {
        case "string":
            fieldType = "string";
            break
        case "double":
            fieldType = "number";
            break
        case "long":
            fieldType = "number";
            break
        case "int":
            fieldType = "number";
            break
        case "boolean":
            fieldType = "boolean";
            break
        case "date":
            fieldType = "date";
            break
        case "uuid":
            fieldType = "string";
            break
        default:
            fieldType = "string";
            break
    }
    if (fieldCardinality?.toLowerCase() === "list") {
        return `${fieldType}[]`
    } else {
        return fieldType
    }

}