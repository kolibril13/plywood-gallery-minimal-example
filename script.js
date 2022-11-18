hljs.highlightAll();
function display_code_from_gallery_cell(imgs) {
    var name = imgs.dataset.code;
    document.getElementById("code_snippet").innerHTML = name
    hljs.highlightAll();
}
// rest the code content block to an empty paragraph 
function reset_content(imgs) {
    document.getElementById("code_snippet").innerHTML = "<p> <br></p>" //maybe better solution possible?
    hljs.highlightAll();
}

let request = new XMLHttpRequest();
request.open("GET", "gallery_assets/gallery_parameters.json", false);
request.send(null);
let json_content_all = JSON.parse(request.responseText);
jsonData = json_content_all["plywood_content"]

const gallery_area = document.getElementById("gallery_container");

for (let key of Object.keys(jsonData)) {
    let chapter_of_html = key
    gallery_area.insertAdjacentHTML("beforeend", `<br> <h2> ${chapter_of_html} </h2>`);


    let chapter_content = jsonData[key]
    for (const chap_element of chapter_content) {
        let path_of_example = chap_element["image_path"]
        let codeblock_of_example = chap_element["code"]
        let css_of_example = chap_element["css"]
        gallery_area.insertAdjacentHTML("beforeend",
            `<img 
                src ='${path_of_example}'
                data-code = '${codeblock_of_example}' 
                style = '${css_of_example}'
                onclick = 'display_code_from_gallery_cell(this);' 
                class = 'gallery_entry' 
                >`);
    }
}