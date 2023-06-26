export default function AdminCategoryForm(props){
    return(
        <form>
            <label htmlFor="name">Kategória megnevezés</label>
            <input value={props.stateVar.name} name="name" onChange={(e) => props.callback(e.target.name, e)} />
        </form>
    );
}
