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
    var template_heading = document.getElementById("heading-template");
    var my_heading = template_heading.content.cloneNode(true);
    my_heading.querySelector("h2").innerHTML = chapter_of_html;
    gallery_area.appendChild(my_heading);


    let chapter_content = jsonData[key]
    for (const chap_element of chapter_content) {
        let path_of_example = chap_element["image_path"]
        let codeblock_of_example = chap_element["code"]
        let css_of_example = chap_element["css"]

        var template_entry = document.getElementById("gallery-item-template");
        var my_entry = template_entry.content.cloneNode(true);
        my_entry.querySelector(".gallery_entry").style = css_of_example;
        my_entry.querySelector(".gallery_entry").src = path_of_example;
        my_entry.querySelector(".gallery_entry").dataset.code = codeblock_of_example;
        gallery_area.appendChild(my_entry);
    }
}