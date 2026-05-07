---
title: 反射系数
type: docs
---


一个计算菲涅尔反射系数的`Mathematica`包



{{< details title="Mathematica程序包" closed="true" >}}

```Mathematica
BeginPackage["FresnelReflection`"];

FLRSolveForIncident::usage = 
    "FLR[i] is used for calculating the Fresnel reflection (FLR) coefficient for incidient and plotting "
FLRPlotForIncident::usage = 
    "FLR[i] is used for plot the graph for Fresnel reflection (FLR) coefficient and incidient "

FLRSolveForIOR::usage = 
    "FLR[i] is used for calculating the Fresnel reflection (FLR) coefficient for IOR and plotting "
FLRPlotForIOR::usage = 
    "FLR[i] is used for plot the graph for Fresnel reflection (FLR) coefficient and IOR "



Begin[ "`Private`" ]


(* ::Section:: *)
(* >>>>>> ForIncident <<<<<< *)

FLRSolveForIncident[i_, n_] := Module[{i1=i,n1=n},
NSolve[
        ( Sin[#1-ArcSin[Sin[#1]/n1] ]/Sin[#1+ArcSin[Sin[#1]/n1] ] )^2&@i1,
        i1, PositiveReals
        ]
    ];


FLRPlotForIncident[n_] := Module[{n1=n},
    Plot[{
        1,
        ( Sin[#1-ArcSin[Sin[#1]/n1] ]/Sin[#1+ArcSin[Sin[#1]/n1] ] )^2&@i1
        },
        {i1,0,Pi/2},
        PlotRange->{0,1},
        (* Axes -> True, *)
        AxesLabel -> {"入射角 i", "反射强度|b|"^2},
        ImageSize->{400,200},
        PlotStyle->{Directive[DarkBlue,Dashed],Automatic},
        PlotLegends -> 
            Placed[
                LineLegend[
                    {"最大反射强度","折射率 n="<>ToString@N[n]<>"）"},
                    LegendFunction -> (Style[#, Small] &)
                ],
            Bottom],
        Ticks -> {Automatic,
            (* Transpose[Table[i, {i, 0, #1, #1/6}] & /@ {90, Pi/2}],  *)
            Table[t, {t, 0, 1, 0.2}]},
        PlotLabel-> Style["反射强度-折射率变化图",Bold],
        ImageMargins -> 15
    ];
]


(* ::Section:: *)
(* >>>>>> ForIOR <<<<<< *)

FLRSolveForIOR[i_, n_] := Module[{i1=i,n1=n},
NSolve[
        ( Sin[i1-ArcSin[Sin[i1]/#1] ]/Sin[i1+ArcSin[Sin[i1]/#1] ] )^2&/@n1,
        n1, PositiveReals
        ]
    ];


FLRPlotForIOR[i_] := Module[{i1=i},
    Plot[{
        1,
        ( Sin[i1-ArcSin[Sin[i1]/#1] ]/Sin[i1+ArcSin[Sin[i1]/#1] ] )^2&/@n
        },
        {n,1,3},
        PlotRange->{0,1},
        (* Axes -> True, *)
        AxesLabel -> {"折射率大小 n", "反射强度|b|"^2},
        ImageSize->{400,200},
        PlotStyle->{Directive[DarkBlue,Dashed],Automatic},
        PlotLegends -> 
            Placed[
                LineLegend[
                    {"最大反射强度","反射强度（入射角 i="<>ToString@N[i/Degree]<>"°）"},
                    LegendFunction -> (Style[#, Small] &)
                ],
            Bottom],
        Ticks -> {Automatic,
            (* Transpose[Table[i, {i, 0, #1, #1/6}] & /@ {90, Pi/2}],  *)
            Table[t, {t, 0, 1, 0.2}]},
        PlotLabel-> Style["反射强度-折射率变化图",Bold],
        ImageMargins -> 15
    ];
]

End[];
EndPackage[]

```

{{< /details >}}