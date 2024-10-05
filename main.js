let Points = [];
function Main() {
    DisplayWipList();
}
function DisplayList() {

}
function DisplayWipList() {
    var div = document.getElementById("list-group");
    var x = GetWip();
    console.log(localStorage.getItem("wip"));
    div.innerHTML = "";
    if (x != null) {
        Points = x;
        x.forEach(element => {
            console.log(element);
            div.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${element.text}
                    <div>
                        <button class="btn btn-success rounded-pill">Edit</button>
                        <button class="btn btn-danger rounded-pill" onclick="DeleteWip('${element.id}')">Remove</button>
                    </div>
                </li>`;
        });
    }
}
function Setdate(e) {
    document.getElementById("Wipdate").innerHTML = e.target.value
}
function CreateWip() {
    let text = document.getElementById("input2");
    if (text.value == "") {
        alert("plz fill the input box");
    }
    let id = crypto.randomUUID();
    let add = { id: id, text: text.value };
    Points.push(add);
    localStorage.setItem("wip", JSON.stringify(Points));
    text.value = "";
    DisplayWipList();
}
function DeleteWip(id) {
    let apps = GetWip();
    apps.splice(apps.findIndex(a => a.id == id) , 1)
    SetWip(apps);
    DisplayWipList();
}
function EditWip() {

}
function ViewWip() {

}
function CopyWip() {

}
function GetWipList() {

}
function GetWip() {
    return JSON.parse(localStorage.getItem("wip"));
}
function SetWip(apps) {
    localStorage.setItem("wip", JSON.stringify(apps));
}
function ClearWipList() {
    localStorage.removeItem("wip");
    Points = [];
    DisplayWipList();
}
Main();