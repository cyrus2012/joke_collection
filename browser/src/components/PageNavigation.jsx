import { useState } from "react";


function PageNavigation(props){

    const [currentPage, setCurrentPage] = useState(props.currentPage);

    function isPositiveInteger(string){
        const regExp = new RegExp("^[1-9][0-9]*$");
        return regExp.test(string);
    }

    function onPageChange(event){
        setCurrentPage(event.target.value);
    }

    function switchPage(event){
        event.preventDefault();
        const button = event.target;

        button.setAttribute("disabled", "disabled");    

        if(isPositiveInteger(currentPage)){
            if(currentPage >= 1 && currentPage <= props.totalPage){
                button.removeAttribute("disabled");
                return props.onSwitchPage(currentPage);
            }
        }

        button.removeAttribute("disabled");
        window.alert("please enter valid page number");
    }

    return (
        <>
            <button className="mx-2 border-1 rounded-2" onClick={switchPage}>Go</button>
            <input type="number" min="1" max={props.totalPage} value={currentPage} onChange={onPageChange}/>
            <span className="ms-2">/ {props.totalPage} {props.totalPage > 1? "pages" : "page"}</span>
        </>
    )
}

export default PageNavigation;