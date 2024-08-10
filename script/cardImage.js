import { default as SkillCards } from "../gakumas-data/data/skillCards.js";

export let guessCardId = -1;
// 动态生成按钮  
export function initButtons(filtered) {  
    const imageData = {  
        "button1": "https://via.placeholder.com/150?text=Button+1",  
        "button2": "https://via.placeholder.com/150?text=Button+2",  
        "button3": "https://via.placeholder.com/150?text=Button+3",  
        "button4": "https://via.placeholder.com/150?text=Button+4",  
        "button5": "https://via.placeholder.com/150?text=Button+5",  
        // 继续添加更多按钮信息...  
    }; 

    const buttonContainer = document.getElementById('buttonContainer'); 
    buttonContainer.innerHTML=""
    let kanon=0;

    SkillCards.getFiltered(filtered).forEach(buttonId => {
        buttonContainer.appendChild(addButton(buttonId));
        if(kanon==0){
            showImage(buttonId.id);
            kanon=1;
        }
    });
    
}

export function addButton(buttonId){
    const button = document.createElement('button');  
    button.type = 'button';  
    button.className = 'btn btn-primary m-1 btn-padding';  
    button.id = buttonId.id;  

    // 创建图片元素  
    const img = document.createElement('img');  
    img.src = "kkeGuessCard/gakumas-data/images/skillCards/icons/"+buttonId.icon+".png";  
    img.style.width = '100%'; // 设置图片宽度填满按钮  
    img.style.maxWidth = '6rem'; // 设置图片最大宽度  

    button.appendChild(img);  

    // 添加点击事件  
    button.onclick = () => showImage(buttonId.id);
    return button
}

// 显示选中按钮的图片  
function showImage(buttonId) {  
    guessCardId = buttonId;
    const displayedImage = document.getElementById('displayedImage');    
    displayedImage.src = "kkeGuessCard/gakumas-data/images/skillCards/details/"+buttonId+".png";  
    displayedImage.style.display = 'block'; // 显示图片  
}  