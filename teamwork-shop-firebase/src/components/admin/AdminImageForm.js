
export default function AdminImageForm(props) {
    return(
        <>
            <form>
                <label htmlFor="image">Termék kép</label>
                <input type="file" name="image" onChange={(e) => props.callback(e)}/>
            </form>
        </>
    )
}