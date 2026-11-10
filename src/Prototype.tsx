import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

const ink = "#25201d";
const skin = "#9b6248";
const shirt = "#496b58";

const Hand: React.FC<{x:number;y:number;rotate:number;scale?:number}> = ({x,y,rotate,scale=1}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
    <path d="M14 220 Q8 330 0 470 L-12 620 Q70 650 145 615 L130 470 Q120 340 105 220 Z" fill={skin} stroke={ink} strokeWidth="9" strokeLinejoin="round"/>
    <path d="M-8 500 Q62 530 137 495 L145 615 Q70 650 -12 620 Z" fill={shirt} stroke={ink} strokeWidth="9" strokeLinejoin="round"/>
    <path d="M14 220 Q8 330 0 470 L-12 620 Q70 650 145 615 L130 470 Q120 340 105 220 Z" fill="none" stroke={ink} strokeWidth="9" strokeLinejoin="round"/>
    <path d="M0 260 Q-20 150 4 82 Q12 52 35 60 L42 150 L50 22 Q54 -2 73 2 Q92 5 88 30 L82 145 L99 35 Q104 12 123 18 Q141 23 134 48 L119 155 L145 75 Q154 54 171 65 Q187 75 175 101 L148 195 Q133 250 91 276 Z" fill={skin} stroke={ink} strokeWidth="9" strokeLinejoin="round"/>
    <path d="M5 245 Q65 265 111 242" fill="none" stroke="#754733" strokeWidth="8" strokeLinecap="round"/>
  </g>
);

const Cup: React.FC<{x:number;y:number;scale?:number}> = ({x,y,scale=1}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="0" cy="0" rx="75" ry="19" fill="#f3eee4" stroke={ink} strokeWidth="8"/>
    <path d="M-68 0 L-54 155 Q0 180 54 155 L68 0" fill="#e9e0cf" stroke={ink} strokeWidth="8"/>
    <path d="M68 30 Q132 12 123 83 Q117 126 58 118" fill="none" stroke={ink} strokeWidth="12"/>
    <ellipse cx="0" cy="5" rx="55" ry="11" fill="#8b5d3d"/>
  </g>
);

export const PovPrototype: React.FC = () => {
  const f = useCurrentFrame();
  const scene = f < 120 ? 0 : f < 240 ? 1 : 2;
  const local = scene === 0 ? f : scene === 1 ? f - 120 : f - 240;
  const cameraY = scene === 1 ? Math.sin(local * 0.22) * 17 + Math.sin(local * 0.44) * 6 : 0;
  const cameraX = scene === 1 ? Math.sin(local * 0.11) * 12 : 0;

  return (
    <AbsoluteFill style={{background:"#d7c5a8",fontFamily:"Arial, sans-serif",overflow:"hidden"}}>
      <AbsoluteFill style={{transform:`translate(${cameraX}px,${cameraY}px)`}}>
        {scene === 0 && <>
          <div style={{position:"absolute",inset:"58% 0 0",background:"#987b60",borderTop:"12px solid #6d5948"}}/>
          <div style={{position:"absolute",left:"12%",top:"57%",width:"76%",height:"4%",background:"#795d46",borderRadius:20}}/>
          <svg viewBox="0 0 1080 1920" style={{width:"100%",height:"100%",position:"absolute"}}>
            <Cup x={local < 55 ? 770 : interpolate(local,[55,100],[770,530],{extrapolateRight:"clamp",easing:Easing.out(Easing.quad)})} y={1190} scale={1.05}/>
            <Hand x={interpolate(local,[0,65,110,120],[690,610,530,530],{extrapolateRight:"clamp"})} y={interpolate(local,[0,65,110,120],[1510,1400,1300,1300],{extrapolateRight:"clamp"})} rotate={interpolate(local,[0,65,110,120],[18,5,-8,-8],{extrapolateRight:"clamp"})} scale={1.35}/>
          </svg>
        </>}
        {scene === 1 && <>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(#a9c0c0 0 52%,#c5a783 52% 100%)"}}/>
          <div style={{position:"absolute",top:"35%",left:"-10%",width:"120%",height:"20%",background:"#b28d6a",borderTop:"10px solid #80634d",borderBottom:"10px solid #80634d",transform:`translateX(${-local*2.4}px)`}}/>
          {[0,1,2,3,4,5].map(i=><div key={i} style={{position:"absolute",top:"18%",left:`${i*24-8-(local*0.55)%24}%`,width:"12%",height:"22%",background:"#d7b99a",border:"8px solid #6e6258"}}/>)}
          <svg viewBox="0 0 1080 1920" style={{width:"100%",height:"100%",position:"absolute"}}>
            <Hand x={-15+Math.sin(local*.22)*22} y={1500+Math.sin(local*.22)*18} rotate={-22+Math.sin(local*.22)*8} scale={1.22}/>
            <Hand x={760+Math.sin(local*.22+1)*20} y={1515+Math.sin(local*.22+1)*18} rotate={20+Math.sin(local*.22+1)*8} scale={1.18}/>
          </svg>
        </>}
        {scene === 2 && <>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(#c5d1cb 0 56%,#9c876d 56% 100%)"}}/>
          <div style={{position:"absolute",bottom:"15%",left:"8%",width:"84%",height:"48%",background:"#d7b18c",border:"12px solid #5c4a3d",borderRadius:"48% 48% 8% 8%"}}/>
          <div style={{position:"absolute",top:"18%",left:"24%",width:"52%",height:"33%",background:"#a66d50",border:"12px solid #382c27",borderRadius:"46% 46% 18% 18%"}}/>
          <div style={{position:"absolute",top:"35%",left:"36%",width:"28%",height:"5%",background:"#28201d",borderRadius:20}}/>
          <div style={{position:"absolute",top:"43%",left:"39%",width:"22%",height:"3%",background:"#382c27",borderRadius:20,transform:`scaleY(${interpolate(Math.sin(local*.55),[-1,1],[.35,1.5])})`}}/>
          <div style={{position:"absolute",top:"47%",left:"29%",width:"42%",height:"3%",background:"#6b4435",borderRadius:20}}/>
          <div style={{position:"absolute",top:"58%",left:"17%",width:"66%",textAlign:"center",fontSize:54,fontWeight:700,color:ink}}>“Você é o ajudante novo?”</div>
        </>}
      </AbsoluteFill>
      <div style={{position:"absolute",top:55,left:50,right:50,display:"flex",justifyContent:"space-between",color:ink,fontSize:28,fontWeight:700,letterSpacing:3}}>
        <span>STUDIO NOVELA</span><span>TESTE POV · 0{scene+1}/03</span>
      </div>
      <div style={{position:"absolute",bottom:50,left:50,right:50,height:8,background:"#ffffff88",borderRadius:20}}>
        <div style={{height:"100%",width:`${(f/359)*100}%`,background:shirt,borderRadius:20}}/>
      </div>
    </AbsoluteFill>
  );
};
