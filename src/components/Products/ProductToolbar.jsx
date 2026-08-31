import "./ProductToolbar.css";

import { FaSearch } from "react-icons/fa";

function ProductToolbar({

search,

setSearch,

sort,

setSort,

count,

}) {

return (

<div className="product-toolbar">

<div className="search-box">

<FaSearch />

<input

type="text"

placeholder="Search electrical products..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<div className="toolbar-right">

<span>

{count} Products

</span>

<select

value={sort}

onChange={(e)=>setSort(e.target.value)}

>

<option value="">

Default

</option>

<option value="low">

Price Low → High

</option>

<option value="high">

Price High → Low

</option>

<option value="name">

A-Z

</option>

</select>

</div>

</div>

);

}

export default ProductToolbar;