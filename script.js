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

users = []
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
        my_img.src = path_of_example;
        my_img.dataset.code = codeblock_of_example;
        gallery_area.appendChild(my_img);
        users.push({ name: codeblock_of_example, img: my_img })

    }
}


console.log(users)




const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    console.log(value)
    console.log(users)

    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(value)
        console.log(isVisible)
        // user.element.classList.toggle("hide", !isVisible)
        if (!isVisible) { 
            user.img.style ="height:1px;";
          }
        if (isVisible) { 
            user.img.style ="height: 100px;";
        } 
    })
})