import { useEffect, useRef } from "react";

function Background() {
    const svgRef = useRef<SVGSVGElement | null>(null);
    useEffect(() => {
        const svgRoot = svgRef.current;
        if (!svgRoot) return;

        const circlesOdd :NodeListOf<Element> | undefined = svgRef.current?.querySelectorAll('.svgCircleOdd');
        if (circlesOdd) {
            circlesOdd.forEach((circle) => {
                circle.setAttribute('style', `animation: circleAnimationOdd 30s linear infinite; opacity: 0.7;`);
            });
        }
        const circlesEven :NodeListOf<Element> | undefined = svgRef.current?.querySelectorAll('.svgCircleEven');
        if (circlesEven) {
            circlesEven.forEach((circle) => {
                circle.setAttribute('style', `animation: circleAnimationEven 30s linear infinite; opacity: 0.7;`)
            });
        }


    });

    return (
        <svg className="svgBackground w-full h-full" xmlns="http://www.w3.org/2000/svg" version="1.1"
             width="3860" height="2160" preserveAspectRatio="xMinYMin slice" viewBox="0 0 3860 2160" ref={svgRef}>
            <g clipPath="url(&quot;#SvgjsClipPath16857&quot;)" fill="none">
                <rect width="3860" height="2160" x="0" y="0" fill="url(&quot;#SvgjsLinearGradient16858&quot;)"/>
                <circle className="svgCircleOdd" id="circle1" r="116.645" cx="475.74" cy="487.18" fill="url(&quot;#SvgjsLinearGradient16860&quot;)"/>
                <circle className="svgCircleOdd" id="circle2" r="60.29" cx="126.75" cy="137.92" fill="url(&quot;#SvgjsLinearGradient16861&quot;)"/>
                <circle className="svgCircleOdd" id="circle3" r="159.495" cx="3554.37" cy="1198.37" fill="url(&quot;#SvgjsLinearGradient16862&quot;)"/>
                <circle className="svgCircleOdd" id="circle4" r="118.11" cx="1042.36" cy="1557.21" fill="url(&quot;#SvgjsLinearGradient16863&quot;)"/>
                <circle className="svgCircleOdd" id="circle5" r="86.74" cx="3110.53" cy="1011.01" fill="url(&quot;#SvgjsLinearGradient16864&quot;)"/>
                <circle className="svgCircleOdd" id="circle6" r="95.635" cx="560.94" cy="101.93" fill="url(&quot;#SvgjsLinearGradient16865&quot;)"/>
                <circle className="svgCircleOdd" id="circle7" r="201.66" cx="3488.12" cy="1737.33" fill="url(&quot;#SvgjsLinearGradient16866&quot;)"/>
                <circle className="svgCircleOdd" id="circle8" r="96.69" cx="1909.67" cy="2016.29" fill="url(&quot;#SvgjsLinearGradient16867&quot;)"/>
                <circle className="svgCircleOdd" id="circle9" r="118.045" cx="484.71" cy="1392.78" fill="url(&quot;#SvgjsLinearGradient16868&quot;)"/>
                <circle className="svgCircleOdd" id="circle10" r="135.165" cx="2617.39" cy="695.99" fill="url(&quot;#SvgjsLinearGradient16869&quot;)"/>
                <circle className="svgCircleOdd" id="circle11" r="67.825" cx="1380.22" cy="184.77" fill="url(&quot;#SvgjsLinearGradient16870&quot;)"/>
                <circle className="svgCircleOdd" id="circle12" r="93.055" cx="2505.56" cy="1998.44" fill="url(&quot;#SvgjsLinearGradient16871&quot;)"/>
                <circle className="svgCircleOdd" id="circle13" r="211.885" cx="963.68" cy="954.6" fill="url(&quot;#SvgjsLinearGradient16872&quot;)"/>
                <circle className="svgCircleOdd" id="circle14" r="182.745" cx="3521.73" cy="683.72" fill="url(&quot;#SvgjsLinearGradient16873&quot;)"/>
                <circle className="svgCircleOdd" id="circle15" r="61.89" cx="113.15" cy="1573.96" fill="url(&quot;#SvgjsLinearGradient16859&quot;)"/>
                <circle className="svgCircleEven" id="circle16" r="61.89" cx="113.15" cy="1573.96" fill="url(&quot;#SvgjsLinearGradient16859&quot;)"/>
                <circle className="svgCircleEven" id="circle17" r="116.645" cx="475.74" cy="487.18" fill="url(&quot;#SvgjsLinearGradient16860&quot;)"/>
                <circle className="svgCircleEven" id="circle18" r="60.29" cx="126.75" cy="137.92" fill="url(&quot;#SvgjsLinearGradient16861&quot;)"/>
                <circle className="svgCircleEven" id="circle19" r="159.495" cx="3554.37" cy="1198.37" fill="url(&quot;#SvgjsLinearGradient16862&quot;)"/>
                <circle className="svgCircleEven" id="circle20" r="118.11" cx="1042.36" cy="1557.21" fill="url(&quot;#SvgjsLinearGradient16863&quot;)"/>
                <circle className="svgCircleEven" id="circle21" r="86.74" cx="3110.53" cy="1011.01" fill="url(&quot;#SvgjsLinearGradient16864&quot;)"/>
                <circle className="svgCircleEven" id="circle22" r="95.635" cx="560.94" cy="101.93" fill="url(&quot;#SvgjsLinearGradient16865&quot;)"/>
                <circle className="svgCircleEven" id="circle23" r="201.66" cx="3488.12" cy="1737.33" fill="url(&quot;#SvgjsLinearGradient16866&quot;)"/>
                <circle className="svgCircleEven" id="circle24" r="96.69" cx="1909.67" cy="2016.29" fill="url(&quot;#SvgjsLinearGradient16867&quot;)"/>
                <circle className="svgCircleEven" id="circle25" r="118.045" cx="484.71" cy="1392.78" fill="url(&quot;#SvgjsLinearGradient16868&quot;)"/>
                <circle className="svgCircleEven" id="circle26" r="135.165" cx="2617.39" cy="695.99" fill="url(&quot;#SvgjsLinearGradient16869&quot;)"/>
                <circle className="svgCircleEven" id="circle27" r="67.825" cx="1380.22" cy="184.77" fill="url(&quot;#SvgjsLinearGradient16870&quot;)"/>
                <circle className="svgCircleEven" id="circle28" r="93.055" cx="2505.56" cy="1998.44" fill="url(&quot;#SvgjsLinearGradient16871&quot;)"/>
                <circle className="svgCircleEven" id="circle29" r="211.885" cx="963.68" cy="954.6" fill="url(&quot;#SvgjsLinearGradient16872&quot;)"/>
                <circle className="svgCircleEven" id="circle30" r="182.745" cx="3521.73" cy="683.72" fill="url(&quot;#SvgjsLinearGradient16873&quot;)"/>
            </g>
            <defs>
                <clipPath id="SvgjsClipPath16857">
                    <rect width="3860" height="2160" x="0" y="0"/>
                </clipPath>
                <linearGradient x1="11.01%" y1="119.68%" x2="88.99%" y2="-19.68%" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16858">
                    <stop stopColor="rgba(183, 231, 242, 1)" offset="0.33"/>
                    <stop stopColor="rgba(252, 212, 255, 1)" offset="1"/>
                </linearGradient>
                <linearGradient x1="-10.629999999999995" y1="1573.96" x2="236.93" y2="1573.96" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16859">
                    <stop stopColor="rgba(255, 121, 146, 1)" offset="0.1"/>
                    <stop stopColor="rgba(142, 120, 249, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="242.45000000000002" y1="487.18" x2="709.03" y2="487.18" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16860">
                    <stop stopColor="#f29b7c" offset="0.1"/>
                    <stop stopColor="rgba(217, 165, 232, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="247.32999999999998" y1="258.5" x2="6.170000000000002" y2="17.33999999999999"
                                gradientUnits="userSpaceOnUse" id="SvgjsLinearGradient16861">
                    <stop stopColor="#e298de" offset="0.1"/>
                    <stop stopColor="rgba(255, 187, 187, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="3873.36" y1="1517.36" x2="3235.38" y2="879.3799999999999" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16862">
                    <stop stopColor="#e298de" offset="0.1"/>
                    <stop stopColor="rgba(255, 187, 187, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="806.1399999999999" y1="1557.21" x2="1278.58" y2="1557.21" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16863">
                    <stop stopColor="rgba(255, 121, 146, 1)" offset="0.1"/>
                    <stop stopColor="rgba(142, 120, 249, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="2937.05" y1="1011.01" x2="3284.01" y2="1011.01" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16864">
                    <stop stopColor="#e298de" offset="0.1"/>
                    <stop stopColor="rgba(232, 71, 99, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="369.6700000000001" y1="101.93" x2="752.21" y2="101.93" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16865">
                    <stop stopColor="rgba(204, 204, 255, 1)" offset="0.1"/>
                    <stop stopColor="rgba(255, 142, 114, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="3084.7999999999997" y1="1737.33" x2="3891.4399999999996" y2="1737.33"
                                gradientUnits="userSpaceOnUse" id="SvgjsLinearGradient16866">
                    <stop stopColor="rgba(255, 121, 146, 1)" offset="0.1"/>
                    <stop stopColor="rgba(142, 120, 249, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="1716.29" y1="2016.29" x2="2103.05" y2="2016.29" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16867">
                    <stop stopColor="#f29b7c" offset="0.1"/>
                    <stop stopColor="rgba(217, 165, 232, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="248.61999999999998" y1="1628.8700000000001" x2="720.8" y2="1156.69"
                                gradientUnits="userSpaceOnUse" id="SvgjsLinearGradient16868">
                    <stop stopColor="rgba(255, 189, 252, 1)" offset="0.1"/>
                    <stop stopColor="rgba(163, 143, 255, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="2347.06" y1="695.99" x2="2887.72" y2="695.99" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16869">
                    <stop stopColor="#e298de" offset="0.1"/>
                    <stop stopColor="rgba(232, 71, 99, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="1244.57" y1="184.77" x2="1515.87" y2="184.77" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16870">
                    <stop stopColor="rgba(204, 204, 255, 1)" offset="0.1"/>
                    <stop stopColor="rgba(255, 142, 114, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="2691.67" y1="2184.55" x2="2319.45" y2="1812.33" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16871">
                    <stop stopColor="#e298de" offset="0.1"/>
                    <stop stopColor="rgba(255, 187, 187, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="539.91" y1="954.6" x2="1387.4499999999998" y2="954.6" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16872">
                    <stop stopColor="#f29b7c" offset="0.1"/>
                    <stop stopColor="rgba(217, 165, 232, 1)" offset="0.9"/>
                </linearGradient>
                <linearGradient x1="3887.22" y1="1049.21" x2="3156.24" y2="318.23" gradientUnits="userSpaceOnUse"
                                id="SvgjsLinearGradient16873">
                    <stop stopColor="#e298de" offset="0.1"/>
                    <stop stopColor="rgba(255, 187, 187, 1)" offset="0.9"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

export default Background;