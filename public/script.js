function setup(){
    let page;
    let prePage;
    showHide(false, 'homePage', 'others');
};

function showHide(back, show, hide){
    document.getElementById(show).style.display = 'block';
    page = show;
    if(hide == 'others'){
        document.getElementById('buyPage').style.display = 'none';
        document.getElementById('sellPage').style.display = 'none';
    }
    else{
        prePage = hide;
        document.getElementById(hide).style.display = 'none';
    }
    if(back == true){
        document.getElementById('back').style.display = 'block';
    }
    if(back == false){
        document.getElementById('back').style.display = 'none';
    }
}

function sell(){
    const video = createCapture(VIDEO);
    video.size(320, 240);
    document.getElementById('post').onclick = () => {
        video.loadPixels();
        let image64 = video.canvas.toDataURL();
        video.remove();
        let newPost = {
            data: document.getElementById('txt').value,
            img:  image64,
            price: document.getElementById('price').value,
            pn: document.getElementById('pn').value,
            catigory: document.getElementById('catigory').value,
        };
    
        let options = {
            method: 'Post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost),
        }
        newpost();
        async function newpost(){
            let response = await fetch('/send', options);
            let res = await response.json();
            console.log(res);
            showHide(false, 'homePage', 'others');
        }
    };
}

function buy(){
    document.querySelector('body').style.backgroundColor = 'rgb(56, 51, 51)';
    getTheData();
    async function getTheData(){
        let response = await fetch('/recieve');
        let docs = await response.json();
        let length_ = docs.length;
        document.getElementById('tbody').innerHTML = '<br>';
        for(let i=0; i < length_; i++){
            document.getElementById('tbody').innerHTML += `
                <div style="background-color: white; border-radius: 15px; pading: 0;margin: 0; border: 2px">
                    <img width="200" src="${docs[i].img}" style=" border-radius: 15px;">
                    <h3>name: ${docs[i].data}</h3>
                    <h3>price: ${docs[i].price}</h3>
                    <h3 style="border-radius: 15px;">phone number: ${docs[i].pn}</h3>
                </div>
            `;
        }
    }
    setInterval(getTheData, 1000);
}

document.getElementById('buy').onclick = () => {
    showHide(true, 'buyPage', 'homePage');
    buy();
}
document.getElementById('sell').onclick = () => {
    showHide(false, 'sellPage', 'homePage');
    sell();
}

document.getElementById('back').onclick = () => {
    showHide(false, prePage, page);
}