export default function AdminCategoryListOptions(categoryList) {
    const categoryNames = categoryList.categoryList;
   
    return categoryNames.map((categoryName) => {
        return <option key={categoryName} value={categoryName}>{categoryName}</option>;
    });
}