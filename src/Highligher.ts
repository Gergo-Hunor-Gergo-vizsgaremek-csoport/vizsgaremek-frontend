export function HighlightElements(elements:HTMLElement[],searchquery:string) {

    elements.filter(x=>x.dataset.text?.toLowerCase().includes(searchquery.toLowerCase()))
        .forEach(element => {HighLight(element,searchquery)});
}

    function HighLight(element:HTMLElement,searchquery:string) {
    let text = element.dataset.text;
    if (!text)
    {
        return;
    }
    else
    {
        let id = text.toLowerCase().indexOf(searchquery.toLowerCase());
        let highlightedText = text.substring(0,id)
            +`<strong>${text.substring(id,id+searchquery.length)}</strong>`
            +text.substring(id+searchquery.length,text.length);
        element.innerHTML = highlightedText;
    }

}