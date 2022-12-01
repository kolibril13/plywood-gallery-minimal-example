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

plywood_entries = []
for (let key of Object.keys(jsonData)) {
    let chapter_of_html = key
    var template_heading = document.querySelector("[heading-template]");
    var my_heading = template_heading.content.cloneNode(true);
    my_heading.querySelector("h2").innerHTML = chapter_of_html;
    gallery_area.appendChild(my_heading);

    let chapter_content = jsonData[key]
    for (const chap_element of chapter_content) {
        let path_of_example = chap_element["image_path"]
        let codeblock_of_example = chap_element["code"]
        let css_of_example = chap_element["css"]

        var template_entry = document.querySelector("[gallery-item-template]");
        var my_entry = template_entry.content.cloneNode(true);
        let my_img = my_entry.querySelector(".gallery_entry") // why this?
        my_img.style = css_of_example;
        my_img.ref_style = css_of_example;
        my_img.src = path_of_example;
        my_img.dataset.code = codeblock_of_example;
        gallery_area.appendChild(my_img);
        plywood_entries.push({ codesnip: codeblock_of_example, img: my_img })

    }
}

const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()

    plywood_entries.forEach(pw_entry => {
        const isVisible = pw_entry.codesnip.toLowerCase().includes(value)
        console.log(isVisible)
        if (!isVisible) {
            pw_entry.img.style = "opacity:0.1";
        }
        if (isVisible) {
            pw_entry.img.style = pw_entry.img.ref_style;
            // pw_entry.img.style ="height:200px" // this line would have a nice folding effect

        }


    })
})