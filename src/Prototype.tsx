import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

const C = {
  ink: "#30251f", skin: "#b97859", skin2: "#d69a78", shirt: "#456b58",
  wall: "#d8c4a5", dark: "#514239", cream: "#f1e5cf", gold: "#e5b84f"
};

const Person: React.FC<{x:number;y:number;scale?:number;shirt?:string;hair?:string;skin?:string;role?: "woman"|"teen"|"worker"|"foreman";turn?:number}> =
({x,y,scale=1,shirt=C.shirt,hair="#30231f",skin=C.skin,role="worker",turn=0}) => {
  const woman = role === "woman";
  const teen = role === "teen";
  return <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${turn} 170 300)`}>
    <path d="M105 260 Q65 300 54 520 L34 650 L292 650 L278 500 Q278 320 225 260Z" fill={shirt} stroke={C.ink} strokeWidth="9"/>
    <path d="M115 245 L95 315 L170 370 L238 310 L220 245Z" fill={skin} stroke={C.ink} strokeWidth="8"/>
    <path d="M92 110 Q80 20 170 18 Q270 22 252 140 L245 220 Q225 286 170 286 Q105 275 90 210Z" fill={skin} stroke={C.ink} strokeWidth="9"/>
    {woman ? <path d="M92 155 Q35 30 150 5 Q275 -8 266 115 L300 300 L260 360 L242 205 Q205 250 115 224 L75 315 L45 270Z" fill={hair} stroke={C.ink} strokeWidth="10"/> :
      <path d={teen ? "M85 125 Q70 10 170 15 Q260 5 255 125 Q205 85 165 95 Q120 92 85 125Z" : "M85 130 Q70 20 170 15 Q260 10 255 125 Q200 88 165 95 Q120 90 85 130Z"} fill={hair} stroke={C.ink} strokeWidth="10"/>}
    <path d="M125 165 Q140 155 151 165 M190 165 Q205 155 217 165" fill="none" stroke={C.ink} strokeWidth="8" strokeLinecap="round"/>
    <path d="M145 215 Q170 230 195 214" fill="none" stroke={C.ink} strokeWidth="7" strokeLinecap="round"/>
    <path d="M65 305 Q20 345 30 475 L55 500 Q85 450 100 355 M265 305 Q315 345 305 475 L280 500 Q250 450 235 355" fill={skin} stroke={C.ink} strokeWidth="10"/>
    <path d="M115 650 L105 760 L155 760 L170 650 M190 650 L200 760 L250 760 L235 650" fill="#514238" stroke={C.ink} strokeWidth="9"/>
    <path d="M92 760 Q125 735 160 760 L165 790 L70 790Z M190 760 Q225 735 260 760 L285 790 L195 790Z" fill="#292b2c" stroke={C.ink} strokeWidth="9"/>
  </g>;
};

const PovHands: React.FC<{f:number;raised?:boolean}> = ({f,raised=false}) => {
 const lift = raised ? interpolate(f%40,[0,20,40],[0,-55,0]) : Math.sin(f*.12)*8;
 return <g transform={`translate(0 ${lift})`}>
   <path d="M-30 1920 L-15 1580 Q35 1490 115 1530 L205 1920Z M1110 1920 L1090 1580 Q1040 1490 965 1530 L875 1920Z" fill="#3f5f50" stroke={C.ink} strokeWidth="14"/>
   <path d="M30 1590 Q25 1490 80 1450 L100 1330 Q110 1295 140 1305 Q165 1315 150 1355 L140 1445 Q185 1400 205 1430 Q220 1455 190 1490 L150 1580Z" fill={C.skin} stroke={C.ink} strokeWidth="10"/>
   <path d="M1050 1590 Q1055 1490 1000 1450 L980 1330 Q970 1295 940 1305 Q915 1315 930 1355 L940 1445 Q895 1400 875 1430 Q860 1455 890 1490 L930 1580Z" fill={C.skin} stroke={C.ink} strokeWidth="10"/>
 </g>;
};

const Bubble: React.FC<{text:string;top?:number;left?:number;width?:number}> = ({text,top=330,left=90,width=900}) => (
 <div style={{position:"absolute",top,left,width,boxSizing:"border-box",padding:"22px 30px",background:"#fff8e9",border:"5px solid #30251f",borderRadius:28,color:C.ink,fontSize:38,fontWeight:800,textAlign:"center",boxShadow:"0 10px 0 #30251f33"}}>
 {text}
 </div>
);

const SceneLabel: React.FC<{name:string;number:string}> = ({name,number}) => <div style={{position:"absolute",top:54,left:48,right:48,display:"flex",justifyContent:"space-between",fontSize:25,fontWeight:900,letterSpacing:2,color:"#fff8e9",textShadow:"0 3px 5px #000"}}><span>O ÚLTIMO OVO</span><span>{number} · {name}</span></div>;

export const PovPrototype: React.FC = () => {
 const f=useCurrentFrame();
 const sec=f/30;
 const scene=sec<12?0:sec<22?1:sec<32?2:sec<47?3:sec<60?4:sec<73?5:6;
 const local=sec-[0,12,22,32,47,60,73][scene];
 const shake=scene===2||scene===3?Math.sin(f*.17)*7:0;
 const bg = scene<=1 ? "#d8c4a5" : scene===2 ? "#9db9b6" : scene<=4 ? "#b7c2b5" : "#c8b49b";
 return <AbsoluteFill style={{background:bg,fontFamily:"Arial, sans-serif",overflow:"hidden"}}>
  <AbsoluteFill style={{transform:`translateX(${shake}px)`}}>
   {(scene===0||scene===1)&&<>
    <div style={{position:"absolute",inset:"0 0 48%",background:"#d9c5a8"}}/>
    <div style={{position:"absolute",top:"10%",left:"7%",width:"30%",height:"32%",background:"#8d9a91",border:"14px solid #55483c",borderRadius:14}}/>
    <div style={{position:"absolute",top:"13%",left:"10%",width:"24%",height:"26%",background:"#a9c7c0"}}/>
    <div style={{position:"absolute",top:"15%",left:"57%",width:"31%",height:"34%",background:"#eee5d4",border:"12px solid #5a4b40",borderRadius:18}}/>
    <div style={{position:"absolute",top:"20%",left:"61%",fontSize:26,color:"#67594c",fontWeight:800}}>GELADEIRA</div>
    <div style={{position:"absolute",top:"55%",left:"5%",width:"90%",height:"7%",background:"#6b4937",borderRadius:20}}/>
    <div style={{position:"absolute",top:"61%",left:"8%",width:"84%",height:"4%",background:"#9a7050"}}/>
    <div style={{position:"absolute",top:"58%",left:"39%",width:"20%",height:"8%",background:"#eee8d8",borderRadius:"50%",border:"8px solid #544438"}}/>
    <div style={{position:"absolute",top:"58%",left:"45%",width:"8%",height:"4%",background:"#e2a83f",borderRadius:"50%"}}/>
    <svg viewBox="0 0 1080 1920" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
      <Person x={70} y={420} scale={.88} role="woman" shirt="#9d655b"/>
      <Person x={620} y={500} scale={.76} role="teen" shirt="#4c657c" hair="#211b19"/>
      <PovHands f={f} raised={scene===1}/>
    </svg>
    {scene===0&&<div style={{position:"absolute",top:"72%",left:"8%",right:"8%",textAlign:"center",fontSize:42,fontWeight:900,color:C.cream,textShadow:"0 3px 8px #000"}}>ERA O ÚLTIMO OVO DA CASA.</div>}
    {scene===1&&<Bubble text={local<4?"Vai com Deus. E vê se come alguma coisa.":"Pai, hoje você vai conseguir, né?"} top={300}/>}
   </>}
   {scene===2&&<>
    <div style={{position:"absolute",inset:"0 0 45%",background:"#a8c4c3"}}/>
    <div style={{position:"absolute",top:"28%",left:"-10%",width:"120%",height:"30%",background:"#b38d6d",borderTop:"12px solid #725b48",borderBottom:"12px solid #725b48"}}/>
    {Array.from({length:7},(_,i)=><div key={i} style={{position:"absolute",top:`${13+(i%2)*8}%`,left:`${i*17-5}%`,width:"18%",height:"22%",background:["#d9b99a","#b8a18b","#d0b69a"][i%3],border:"8px solid #69584a"}}/>)}
    <div style={{position:"absolute",bottom:"18%",left:"10%",width:"80%",height:"20%",background:"#82705b",clipPath:"polygon(0 100%,15% 0,85% 0,100% 100%)"}}/>
    <svg viewBox="0 0 1080 1920" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}><PovHands f={f}/></svg>
    <div style={{position:"absolute",top:"70%",left:"8%",right:"8%",fontSize:42,fontWeight:900,color:"#fff",textAlign:"center",textShadow:"0 4px 8px #000"}}>A PÉ. PORQUE A PASSAGEM FAZIA FALTA.</div>
   </>}
   {(scene===3||scene===4)&&<>
    <div style={{position:"absolute",inset:"0 0 48%",background:"#b7c8c0"}}/>
    <div style={{position:"absolute",top:"28%",left:"0",right:"0",height:"27%",background:"#b69a7a"}}/>
    <div style={{position:"absolute",top:"17%",left:"8%",width:"84%",height:"28%",border:"18px solid #756454",borderBottom:0}}/>
    <div style={{position:"absolute",top:"44%",left:"0",right:"0",height:"8%",background:"#74604c"}}/>
    <div style={{position:"absolute",top:"50%",left:"8%",width:"84%",height:"8%",background:"#8c7157"}}/>
    <svg viewBox="0 0 1080 1920" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
     <Person x={scene===3?610:650} y={scene===3?320:300} scale={.95} role={scene===3?"foreman":"worker"} shirt={scene===3?"#d4a34c":"#a65c43"} hair="#514238"/>
     <Person x={scene===4?70:90} y={420} scale={.64} role="worker" shirt="#55705d"/>
     <PovHands f={f} raised={scene===4}/>
    </svg>
    {scene===3&&<Bubble text={local<4?"Já trabalhou em obra?":"Então pega aquela pá e começa. Hoje é diária."} top={280}/>}
    {scene===4&&<Bubble text={local<5?"Ô novato! Isso aí não é decoração!":"Chefe é meu joelho. Me chama de Zé."} top={270}/>}
    <div style={{position:"absolute",bottom:"18%",left:"10%",fontSize:34,fontWeight:900,color:"#fff",textShadow:"0 3px 8px #000"}}>{scene===3?"PRIMEIRA DIÁRIA":"O JEITO DO ZÉ"}</div>
   </>}
   {(scene===5||scene===6)&&<>
    <div style={{position:"absolute",inset:"0 0 48%",background:"#c7d0c6"}}/>
    <div style={{position:"absolute",top:"45%",left:"0",right:"0",height:"35%",background:"#92795f"}}/>
    <div style={{position:"absolute",top:"52%",left:"8%",width:"84%",height:"9%",background:"#634a38",borderRadius:12}}/>
    {[0,1,2].map(i=><div key={i} style={{position:"absolute",top:"47%",left:`${18+i*27}%`,width:"17%",height:"6%",background:i===1&&scene===5?"transparent":"#d8d5c9",border:"7px solid #3c332d",borderRadius:18}}/>)}
    <svg viewBox="0 0 1080 1920" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
     <Person x={scene===5?610:570} y={scene===5?300:240} scale={1.0} role="worker" shirt="#a65c43" hair="#332822" turn={scene===6?-8:0}/>
     <PovHands f={f} raised={scene===6}/>
    </svg>
    {scene===5&&<Bubble text={local<4?"Cadê minha marmita?":"Foi você que pegou, novato?"} top={270}/>}
    {scene===6&&<Bubble text={local<5?"Abre essa mochila. Agora.":"E você? Enfrentava o Zé ou ficava quieto?"} top={250}/>}
    {scene===6&&<div style={{position:"absolute",top:"69%",left:"8%",right:"8%",textAlign:"center",fontSize:54,fontWeight:1000,color:"#fff",textShadow:"0 4px 10px #000"}}>E AGORA?</div>}
   </>}
  </AbsoluteFill>
  <SceneLabel number={`0${scene+1}/07`} name={["COZINHA","DESPEDIDA","CAMINHO","A OBRA","A DIÁRIA","ALMOÇO","CONFRONTO"][scene]}/>
  <div style={{position:"absolute",bottom:42,left:42,right:42,height:9,background:"#ffffff77",borderRadius:20}}><div style={{height:"100%",width:`${(f/2699)*100}%`,background:C.gold,borderRadius:20}}/></div>
  <Audio src={staticFile("ep001-voices.wav")} volume={1}/>
 </AbsoluteFill>;
};
