export const Navigation = (props: { setViewMode: (viewMode:string) => void }) => {

    return <aside className="menu">
        <ul className="menu-list">
            <li><a onClick={(evt) => {
                props.setViewMode("admin")
            }}>Admin</a></li>
            <li><a onClick={(evt) => {
                props.setViewMode("quiz")
            }}>Quiz</a></li>
        </ul>

    </aside>
}