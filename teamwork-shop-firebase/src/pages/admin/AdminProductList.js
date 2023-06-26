import AdminProductTable from "../../components/admin/AdminProductTable"
import AdminPagination from '../../components/admin/AdminPagination';

export default function AdminProductList() {
    return (
        <div className="admin-render">
            <AdminProductTable />
			<AdminPagination page={'/admin/termekek'}/>
        </div>
    )
}