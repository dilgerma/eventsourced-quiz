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

        let commandImports = commands.map(command => {
            let commandTitle = slugify(command.title, "")
            return `import {${commandTitle}} from "@/app/api/commands/${commandTitle}";`
        }).join("\n")

        let commandHandlers = commands.map(command => {
            let commandTitle = slugify(command.title, "")
            return `
let handle${commandTitle} = (command: ${commandTitle}): Event[] => {
    return []
}
`
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