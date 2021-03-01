import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';

function Pagination() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)


  const getData = async() => {
      const res = await axios.get(`https://ihsavru.me/Demo/uploads.json`)
      const data = res.data,
            {course:{uploads = {}} = {}} = data;
                const slice = uploads.slice(offset, offset + perPage);
                const postData = slice.map(pd =>
                <tr>
                    <td>{pd.id}</td>
                    <td>{pd.uploader}</td>
                </tr>)
                
                setData(postData)
                setPageCount(Math.ceil(uploads.length / perPage))
  }

const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
};

 useEffect(() => {
   getData()
 }, [offset])


  return (
    <div className="App">
        <table className = 'table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>

       <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
  );
}

export default Pagination;