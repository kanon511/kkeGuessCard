import { initButtons } from "./cardImage.js";

// 定义字典，用于存储分类项及其选项  
const categoriesData = {  
    "plans": {  
        "label": "职业",  
        "options": [  
            { "id": "free", "label": "通用" },
            { "id": "sense", "label": "感性" },  
            { "id": "logic", "label": "理性" }  
        ]  
    },  
    "rarities": {  
        "label": "稀有",  
        "options": [  
            { "id": "N", "label": "白卡" },  
            { "id": "R", "label": "蓝卡" },
            { "id": "SR", "label": "金卡" },
            { "id": "SSR", "label": "彩卡" },
            { "id": "T", "label": "灰卡" }
        ]  
    },
    "types": {  
        "label": "分类",  
        "options": [  
            { "id": "active", "label": "A卡" },  
            { "id": "mental", "label": "M卡" },
            { "id": "trouble", "label": "T卡" }
        ]  
    },
    "sourceTypes": {  
        "label": "类型",  
        "options": [  
            { "id": "default", "label": "基础卡" },
            { "id": "produce", "label": "局内卡" },  
            { "id": "pIdol", "label": "角色卡" },
            { "id": "support", "label": "支援卡" }
        ]  
    },
};  

// 初始化分类项  
function initCategories() {  
    const container = document.getElementById('categoriesContainer');  

    Object.keys(categoriesData).forEach(categoryKey => {  
        const category = categoriesData[categoryKey];  
        const categoryDiv = document.createElement('div');  
        categoryDiv.classList.add('mb-2');  

        const title = document.createElement('h5');  
        title.textContent = category.label; 
        title.classList.add('me-3');  
          

        const selectAll = document.createElement('div');  
        selectAll.classList.add('form-check', 'me-3');  
        const selectAllCheckbox = document.createElement('input');  
        selectAllCheckbox.type = "checkbox";  
        selectAllCheckbox.classList.add('form-check-input');  
        selectAllCheckbox.id = `selectAll${categoryKey}`;
        selectAllCheckbox.click();
        selectAllCheckbox.onclick = () => toggleSelect(categoryKey);
        const label = document.createElement('label');  
        label.classList.add('form-check-label');  
        label.htmlFor = `selectAll${categoryKey}`;  
        label.textContent = "全选";  
        selectAll.appendChild(selectAllCheckbox);  
        selectAll.appendChild(label);  

        const optionsDiv = document.createElement('div');

        optionsDiv.appendChild(title);
        optionsDiv.appendChild(selectAll);
        
        optionsDiv.classList.add('d-flex');  
        category.options.forEach(option => {  
            const optionDiv = document.createElement('div');  
            optionDiv.classList.add('form-check', 'me-3');  

            const optionCheckbox = document.createElement('input');  
            optionCheckbox.type = "checkbox";  
            optionCheckbox.classList.add('form-check-input');  
            optionCheckbox.id = option.id;  
            optionCheckbox.setAttribute('data-category', categoryKey);
            optionCheckbox.click(); 
            optionCheckbox.onclick = () => updateSelect(categoryKey);
            const optionLabel = document.createElement('label');  
            optionLabel.classList.add('form-check-label');  
            optionLabel.htmlFor = option.id;  
            optionLabel.textContent = option.label;  

            optionDiv.appendChild(optionCheckbox);  
            optionDiv.appendChild(optionLabel);  
            optionsDiv.appendChild(optionDiv);
            
             
        });
        
        categoryDiv.appendChild(optionsDiv);  
        container.appendChild(categoryDiv);  
    });  
}  

function toggleSelect(category) {  
    const isChecked = document.getElementById(`selectAll${category}`).checked;  
    const checkboxes = document.querySelectorAll(`input[data-category="${category}"]`);  
    checkboxes.forEach(checkbox => {  
        checkbox.checked = isChecked;  
    });
    getSelectedOptions()
}  

function updateSelect(category) {  
    const selectAllCheckbox = document.getElementById(`selectAll${category}`);  
    const checkboxes = document.querySelectorAll(`input[data-category="${category}"]`);  
    selectAllCheckbox.checked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    getSelectedOptions()
}  

export function getSelectedOptions() {  
    const selectedOptions = {};  
    const checkboxes = document.querySelectorAll('.form-check-input[type="checkbox"]:not([id^="selectAll"])');  

    checkboxes.forEach(checkbox => {  
        if (checkbox.checked) {  
            const category = checkbox.getAttribute('data-category');  
            if (!selectedOptions[category]) {  
                selectedOptions[category] = [];  
            }  
            selectedOptions[category].push(checkbox.id); // 使用选项 ID 作为值  
        }  
    });  

    initButtons(selectedOptions);
}  

// 初始化页面时调用  
initCategories();