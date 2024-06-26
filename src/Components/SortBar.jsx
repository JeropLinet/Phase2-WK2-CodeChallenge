function SortBar({handleSortChange}){
//function that helps us read the value that the user has selected
    const handleSort = (e) => {
        handleSortChange(e.target.value)
    }

    return(
      <div>
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" onChange={handleSort}>
            <option value="health">Health</option>
            <option value="damage">Damage</option>
            <option value="armor">Armour</option>
        </select>
      </div>
    )
}
export default SortBar