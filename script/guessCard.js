import { guessCardId } from "./cardImage.js";
import { default as SkillCards } from "../gakumas-data/data/skillCards.js";
import { addButton } from "./cardImage.js";

let card;
let allCard;
let allCardSimilar=[];
let guessCardList={};

export function init(){
    allCard = SkillCards.getAll();
    card=allCard[Math.floor(Math.random()*allCard.length)];
    allCard.forEach((item) => {
        allCardSimilar.push(contrast(allCard[card.id],item));
    });
    allCardSimilar.sort((a,b)=>{
        return b.s-a.s
    })
    console.log(allCardSimilar)
}

function contrast(a,b){
    let kanon=0;
    if(a.upgraded==b.upgraded) kanon+=0.025
    kanon+=similar(a.conditions,b.conditions)*0.2
    kanon+=similar(a.cost,b.cost)*0.1
    kanon+=similar(a.effects,b.effects)*0.5
    if(a.limit==b.limit) kanon+=0.025
    if(a.unique==b.unique) kanon+=0.025
    if(a.sourceType==b.sourceType) kanon+=0.025
    if(a.forceInitialHand==b.forceInitialHand) kanon+=0.025
    if(a.rarity==b.rarity) kanon+=0.025
    if(a.type==b.type) kanon+=0.025
    if(a.plan==b.plan) kanon+=0.025
    return {
        s:kanon,
        card:b,
        // a:a,
        // cost:similar(a.cost,b.cost),
        // conditions:similar(a.conditions,b.conditions),
        // effects:similar(a.effects,b.effects)
    }
}

function similar(s, t, f) {
    if (s === t){
        return 1
    }
    if (!s || !t) {
        return 0
    }
    var l = s.length > t.length ? s.length : t.length
    var n = s.length
    var m = t.length
    var d = []
    f = f || 3
    var min = function(a, b, c) {
        return a < b ? (a < c ? a : c) : (b < c ? b : c)
    }
    var i, j, si, tj, cost
    if (n === 0) return m
    if (m === 0) return n
    for (i = 0; i <= n; i++) {
        d[i] = []
        d[i][0] = i
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j
    }
    for (i = 1; i <= n; i++) {
        si = s.charAt(i - 1)
        for (j = 1; j <= m; j++) {
            tj = t.charAt(j - 1)
            if (si === tj) {
                cost = 0
            } else {
                cost = 1
            }
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
        }
    }
    let res = (1 - d[n][m] / l)
    //console.log(s,t,res.toFixed(f))
    return res.toFixed(f)
}

function guessCard(){
    for(let i in allCardSimilar){
        if(allCardSimilar[i].card.id==guessCardId){
            console.log(allCardSimilar[i]);
            return{
                rank:Number(i)+1,
                card:allCardSimilar[i].card,
                s:allCardSimilar[i].s
            }
        }
    }
}

function addList(){
    let kanon=guessCard()
    const table = document.getElementById("table");
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');
    th1.innerText=kanon.rank;
    th2.appendChild(addButton(kanon.card))
    th3.innerText=kanon.s;
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tbody.appendChild(tr);
    table.appendChild(tbody);
}

document.getElementById("guessCard").addEventListener('click',addList);