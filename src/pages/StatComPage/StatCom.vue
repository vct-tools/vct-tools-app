<template>
  <div class="options" v-if="optionsOpen">
    <div style="text-align: center; margin-top: 1em; margin-bottom: 1em">
      <HeaderSmall>Options</HeaderSmall>
    </div>
    <UIButtonLabel>Select image (Screen 1)</UIButtonLabel>
    <UIButton @click="selectImg(1)">Select</UIButton>
    <UIButtonLabel>Select image (Screen 2)</UIButtonLabel>
    <UIButton @click="selectImg(2)">Select</UIButton>
    <UIButtonLabel>Select text (Screen 1)</UIButtonLabel>
    <UIField v-model="textOptions.scr1"></UIField>
    <UIButtonLabel>Select text (Screen 2)</UIButtonLabel>
    <UIField v-model="textOptions.scr2"></UIField>
    <div style="margin-bottom: 2em"></div>
    <UIButton @click="optionsOpen = false">Close</UIButton>
    <UIButton @click="fullscreen()">Fullscreen</UIButton>
  </div>

  <div class="stat-com-main">
    <!-- Created with Inkscape (http://www.inkscape.org/) -->

    <svg
      width="720"
      height="1280"
      viewBox="0 0 190.49999 338.66667"
      version="1.1"
      id="svg1"
      xml:space="preserve"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs1">
        <linearGradient id="linearGradient24">
          <stop style="stop-color: #ffffff; stop-opacity: 0.05007825" offset="0" id="stop24" />
          <stop style="stop-color: #ffffff; stop-opacity: 0.5" offset="0.5" id="stop26" />
          <stop style="stop-color: #ffffff; stop-opacity: 0.05" offset="1" id="stop25" />
        </linearGradient>
        <linearGradient id="linearGradient23">
          <stop style="stop-color: #333339; stop-opacity: 1" offset="0" id="stop22" />
          <stop style="stop-color: #817981; stop-opacity: 1" offset="1" id="stop23" />
        </linearGradient>
        <linearGradient id="linearGradient19">
          <stop style="stop-color: #feed85; stop-opacity: 1" offset="0" id="stop19" />
          <stop style="stop-color: #876c42; stop-opacity: 1" offset="0.84402514" id="stop20" />
        </linearGradient>
        <linearGradient id="linearGradient15">
          <stop style="stop-color: #2f2f35; stop-opacity: 1" offset="0" id="stop15" />
          <stop style="stop-color: #625f63; stop-opacity: 1" offset="1" id="stop16" />
        </linearGradient>
        <linearGradient id="linearGradient14">
          <stop style="stop-color: #18323c; stop-opacity: 1" offset="0" id="stop13" />
          <stop style="stop-color: #47c0c4; stop-opacity: 1" offset="1" id="stop14" />
        </linearGradient>
        <linearGradient id="linearGradient10">
          <stop style="stop-color: #706c68; stop-opacity: 1" offset="0" id="stop11" />
          <stop style="stop-color: #736d6b; stop-opacity: 1" offset="1" id="stop12" />
        </linearGradient>
        <radialGradient
          xlink:href="#linearGradient14"
          id="radialGradient2"
          cx="62.860813"
          cy="192.22319"
          fx="62.860813"
          fy="192.22319"
          r="38.426064"
          gradientTransform="matrix(10.837623,2.7585401,-2.2200749,8.7221312,-157.76841,-1655.2077)"
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient
          xlink:href="#linearGradient10"
          id="linearGradient12"
          x1="0"
          y1="169.33333"
          x2="190.5"
          y2="169.33333"
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient
          xlink:href="#linearGradient15"
          id="linearGradient16"
          x1="7.8425312"
          y1="159.77374"
          x2="182.65746"
          y2="159.77374"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1,0,0,0.9940783,0,0.94613253)"
        />
        <linearGradient
          xlink:href="#linearGradient19"
          id="linearGradient20"
          x1="72.363205"
          y1="308.41504"
          x2="117.89718"
          y2="308.41504"
          gradientUnits="userSpaceOnUse"
        />
        <linearGradient
          xlink:href="#linearGradient23"
          id="linearGradient21"
          gradientUnits="userSpaceOnUse"
          x1="72.363205"
          y1="308.41504"
          x2="117.89718"
          y2="308.41504"
          gradientTransform="matrix(1.0959669,0,0,1.0443444,-9.1293542,-12.775199)"
        />
        <linearGradient
          xlink:href="#linearGradient24"
          id="linearGradient25"
          x1="9.7721443"
          y1="200.24104"
          x2="179.67317"
          y2="200.24104"
          gradientUnits="userSpaceOnUse"
          spreadMethod="pad"
          gradientTransform="translate(-0.1357253,23.433755)"
        />
        <mask maskUnits="userSpaceOnUse" id="mask58">
          <rect
            style="
              fill: #e0ebb9;
              stroke: #ffffff;
              stroke-width: 1;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 1;
            "
            id="rect58"
            width="197.00275"
            height="85.410774"
            x="187.98955"
            y="126.61396"
          />
        </mask>
        <mask maskUnits="userSpaceOnUse" id="mask59">
          <rect
            style="
              fill: #e0ebb9;
              stroke: #ffffff;
              stroke-width: 1;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 1;
            "
            id="rect59"
            width="197.00275"
            height="85.410774"
            x="187.98955"
            y="126.61396"
          />
        </mask>
        <mask maskUnits="userSpaceOnUse" id="mask41">
          <path
            style="
              fill: #ffffff;
              fill-opacity: 1;
              stroke: none;
              stroke-width: 0.943999;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.345455;
            "
            d="M 40.838535,60.743055 60.503046,40.968038 h 80.695334 v 78.071002 l -25.11274,25.99302 H 40.838535 Z"
            id="path41"
          />
        </mask>
      </defs>
      <g id="layer1">
        <path
          style="
            fill: #706c68ff;
            fill-opacity: 1;
            stroke: none;
            stroke-width: 0.529167;
            stroke-linecap: round;
          "
          d="M 0,0 H 190.5 V 338.66666 H 0 V 0"
          id="path3"
        />
        <g id="g22">
          <path
            id="path12"
            style="
              fill: url(#linearGradient16);
              stroke: none;
              stroke-width: 0.784981;
              stroke-linecap: round;
            "
            d="M 29.968882,8.4742747 7.8425312,30.469612 8.1971003,240.76731 55.802049,288.09037 h 39.32814 0.474381 0.474394 39.328126 L 183.01203,240.76731 182.65746,30.469612 160.53111,8.4742747 H 135.72373 L 113.479,30.469612 H 95.724395 95.250001 94.77562 77.021021 L 54.776261,8.4742747 Z"
          />
          <path
            id="path1"
            style="
              fill: url(#radialGradient2);
              fill-opacity: 1;
              stroke: none;
              stroke-width: 0.76517;
              stroke-linecap: round;
            "
            d="M 31.805115,11.854103 10.301136,33.358094 9.648797,239.79655 55.91471,286.06247 h 38.221914 0.461038 0.46105 38.221898 l 46.26591,-46.26592 0.65234,-206.438456 -21.50398,-21.503991 h -24.1096 L 112.96625,33.358094 H 95.711051 95.250001 94.788963 77.533767 L 55.91471,11.854103 Z"
          />
        </g>
        <g id="g21" transform="translate(0.119808,-0.22532)">
          <path
            style="
              fill: url(#linearGradient21);
              stroke: none;
              stroke-width: 0.566127;
              stroke-linecap: round;
            "
            d="m 70.178324,288.09037 h 49.903736 v 5.15816 L 97.206825,330.54226 H 93.243566 L 70.178324,294.74472 Z"
            id="path20"
          />
          <path
            style="
              fill: url(#linearGradient20);
              fill-opacity: 1;
              stroke: none;
              stroke-width: 0.529167;
              stroke-linecap: round;
            "
            d="m 72.363202,288.09037 h 45.533978 v 4.93913 L 97.024987,328.73968 H 93.408766 L 72.363202,294.46217 Z"
            id="path16"
          />
        </g>
        <path
          style="
            fill: #ffffff;
            fill-opacity: 0.264336;
            stroke: none;
            stroke-width: 0.529;
            stroke-linecap: round;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          d="m 9.5747472,224.19575 170.0193728,0.53726 -0.0476,15.06354 -46.26591,46.26592 H 55.91471 L 9.6487968,239.79655 Z"
          id="path23"
        />
        <path
          style="
            fill: url(#linearGradient25);
            stroke: none;
            stroke-width: 0.529;
            stroke-linecap: round;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          d="m 9.6364189,224.19594 169.8960311,0.53687 0.005,-1.57917 -169.8960304,-0.53687 z"
          id="path24"
        />
        <path
          id="path26"
          style="
            fill: #000000;
            fill-opacity: 0.109091;
            stroke: #ffffff;
            stroke-width: 0.529;
            stroke-linecap: round;
            stroke-dasharray: none;
            stroke-opacity: 0.521678;
          "
          d="m 26.588041,231.40551 17.913119,17.91312 h 100.17166 l 17.91312,-17.91312 z m 118.084779,17.91312 17.91312,-17.91312 z"
        />
        <g id="g28" transform="translate(0.09922251)">
          <path
            style="
              fill: #ffffff;
              fill-opacity: 0.682517;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            d="m 71.33673,236.09566 -7.077604,8.53282 h 23.151042 l 7.0776,-8.53282 z"
            id="path27"
          />
          <path
            style="
              fill: #ffffff;
              fill-opacity: 0.222378;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            d="m 101.56537,236.09566 -7.077602,8.53282 h 23.151042 l 7.0776,-8.53282 z"
            id="path28"
          />
        </g>
        <text
          xml:space="preserve"
          style="
            font-size: 25.4px;
            font-family: Din;
            -inkscape-font-specification: Din;
            fill: #ffffff;
            fill-opacity: 0.222378;
            stroke: none;
            stroke-width: 0.529;
            stroke-linecap: round;
            stroke-dasharray: none;
            stroke-opacity: 0.521678;
          "
          x="18.486115"
          y="210.40938"
          id="text28"
        >
          <tspan
            id="tspan28"
            style="
              font-style: normal;
              font-variant: normal;
              font-weight: normal;
              font-stretch: normal;
              font-size: 25.4px;
              font-family: Tungsten;
              -inkscape-font-specification: Tungsten;
              fill: #ffffff;
              fill-opacity: 1;
              stroke-width: 0.529;
            "
            x="18.486115"
            y="210.40938"
          >
            {{ second.toString().padStart(2, "0") }}
          </tspan>
        </text>
        <g transform="matrix(0.52916667,0,0,0.52916667,-57.012905,109.81175)" id="g57">
          <path
            fill="none"
            stroke="#c74440"
            class="dcg-svg-curve"
            paint-order="fill stroke markers"
            d="m 0,184.05813 v 0 l 0.9765625,0.57309 0.8789062,0.24169 0.8789063,-0.0239 0.8789063,-0.28892 0.9765624,-0.6236 1.0742188,-1.03291 1.2695312,-1.64124 1.5625001,-2.53224 2.1484372,-4.07935 3.808594,-7.31287 1.660156,-2.56427 1.367188,-1.59709 1.171875,-0.92478 0.976562,-0.42755 0.878906,-0.10682 0.878907,0.15925 0.878906,0.42167 0.976562,0.76431 1.171875,1.29777 1.464844,2.12725 1.757813,3.1108 6.25,11.63219 1.464843,1.86317 1.171875,1.047 0.976563,0.53644 0.878906,0.20758 0.878906,-0.0583 0.878907,-0.3228 0.976562,-0.6597 1.074219,-1.06955 1.367187,-1.82446 1.660157,-2.77322 2.34375,-4.53138 3.222656,-6.16674 1.660156,-2.59352 1.367188,-1.62814 1.171875,-0.95502 0.976562,-0.45436 0.873912,-0.13155 0.883901,0.13456 0.878906,0.39757 0.976562,0.73891 1.171875,1.27017 1.367188,1.94347 1.757812,3.0595 3.027344,5.95888 2.34375,4.34377 1.5625,2.37257 1.367188,1.56923 1.074218,0.83983 0.976563,0.43576 0.878906,0.11438 0.878906,-0.1517 0.878907,-0.41431 0.976562,-0.75656 1.171875,-1.28936 1.464844,-2.11859 1.757812,-3.10383 6.347657,-11.78494 1.464843,-1.8348 1.171875,-1.02068 0.976563,-0.51289 0.878906,-0.18569 0.878906,0.0803 0.878907,0.34442 0.976562,0.68266 1.074219,1.09279 1.367187,1.84974 1.660157,2.79564 2.441406,4.73972 3.02734,5.78289 1.66016,2.60237 1.36719,1.63756 1.17187,0.96422 0.97657,0.46255 0.8989,0.13916 0.85891,-0.12707 0.8789,-0.39019 0.97657,-0.73111 1.17187,-1.26168 1.36719,-1.9352 1.66016,-2.86998 2.73437,-5.36377 2.53906,-4.79251 1.66016,-2.58222 1.36719,-1.61611 1.17187,-0.94329 0.97656,-0.44396 0.84214,-0.12217 0.91568,0.14439 0.8789,0.40694 0.97656,0.7488 1.17188,1.28092 1.46484,2.1099 1.75782,3.0968 6.44531,11.93634 1.36719,1.70433 1.17187,1.02976 0.97656,0.521 0.87891,0.19322 0.87891,-0.0727 0.8789,-0.33699 0.97656,-0.67477 1.07422,-1.08481 1.36719,-1.84108 1.66016,-2.78798 2.4414,-4.7353 3.02735,-5.78951 1.66015,-2.61116 1.36719,-1.64696 1.17188,-0.97341 0.97656,-0.47072 0.92391,-0.14699 0.8339,0.1198 0.87891,0.38279 0.97656,0.72331 1.17187,1.25316 1.36719,1.92689 1.66016,2.86285 2.73437,5.36042 2.63672,4.96704 1.5625,2.42324 1.36719,1.62558 1.17187,0.95251 0.97657,0.45215 0.86713,0.12952 0.89068,-0.13663 0.87891,-0.39957 0.97656,-0.74102 1.17187,-1.27246 1.36719,-1.94571 1.75781,-3.06149 3.125,-6.15185 2.2461,-4.1495 1.5625,-2.3702 1.36718,-1.56663 1.07422,-0.83752 0.97657,-0.43354 0.8789,-0.11233 0.87891,0.15375 0.8789,0.41631 0.97657,0.75866 1.17187,1.29164 1.46485,2.12095 1.75781,3.10572 6.34765,11.78187 1.46485,1.83215 1.17187,1.01822 0.97657,0.51068 0.8789,0.18365 0.87891,-0.0823 0.8789,-0.34643 0.97657,-0.6848 1.07422,-1.09494 1.36718,-1.85209 1.66016,-2.79771 2.44141,-4.7409 3.02734,-5.78108 1.66016,-2.59997 1.36718,-1.63501 1.17188,-0.96173 0.97656,-0.46033 0.89213,-0.13708 0.86568,0.12908 0.87891,0.39219 0.97656,0.73323 1.17188,1.26398 1.36718,1.93744 1.66016,2.87191 2.83203,5.55893 2.53906,4.76376 1.5625,2.41246 1.36719,1.61354 1.17188,0.94079 0.97656,0.44174 0.83536,0.12021 0.92245,-0.14653 0.87891,-0.40894 0.97656,-0.7509 1.17188,-1.28321 1.46484,-2.11226 1.75781,-3.09871 6.34766,-11.79308 1.46484,-1.84194 1.17188,-1.0273 0.97656,-0.5188 0.87891,-0.19118 0.8789,0.0748 0.87891,0.339 0.97656,0.67691 1.07422,1.08698 1.36719,1.84343 1.66015,2.79006 2.44141,4.73651 3.02734,5.78772 1.66016,2.60878 1.36719,1.64442 1.17187,0.97092 0.97656,0.4685 0.91714,0.14485 0.84068,-0.12175 0.8789,-0.3848 0.97657,-0.72542 1.17187,-1.25547 1.36719,-1.92915 1.66015,-2.86478 2.73438,-5.36134 2.53906,-4.79737 1.66016,-2.58871 1.36719,-1.62302 1.17187,-0.95001 0.97656,-0.44993 0.86036,-0.12751 0.89746,0.13871 0.8789,0.40157 0.97656,0.74313 1.17188,1.27476 1.36719,1.94794 1.75781,3.06348 3.125,6.15247 2.24609,4.14757 1.5625,2.36783 1.36719,1.56401 1.07422,0.83522 0.97656,0.43131 0.87891,0.11028 0.8789,-0.1558 0.87891,-0.41829 0.97656,-0.76077 1.17188,-1.29391 1.46484,-2.1233 1.75781,-3.10761 6.34766,-11.77881 1.46484,-1.82948 1.17188,-1.01576 0.97656,-0.50848 0.87891,-0.1816 0.8789,0.0844 0.87891,0.34845 0.97656,0.68693 1.07422,1.0971 1.36719,1.85443 1.66016,2.79977 2.4414,4.74207 3.02735,5.77926 1.66015,2.59758 1.36719,1.63246 1.17187,0.95923 0.97657,0.45811 0.88536,0.13501 0.87245,-0.13111 0.87891,-0.39418 0.97656,-0.73535 1.17187,-1.26628 1.36719,-1.93969 1.66016,-2.87382 2.83203,-5.55979 2.53906,-4.76184 1.5625,-2.41016 1.36719,-1.61097 1.17187,-0.93828 0.97657,-0.43951 0.8789,-0.11784 0.87891,0.14825 0.8789,0.41093 0.97657,0.75301 1.17187,1.2855 1.46485,2.11462 1.75781,3.10061 6.34765,11.79007 1.46485,1.83929 L 400,183.6375"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2.5"
            stroke-dasharray=""
            id="path52"
            style="stroke: #ffffff; stroke-width: 1; stroke-dasharray: none; stroke-opacity: 1"
            mask="url(#mask59)"
          />
          <path
            fill="none"
            stroke="#2d70b3"
            class="dcg-svg-curve"
            paint-order="fill stroke markers"
            d="m 0,164.47746 v 0 l 4.9804687,-1.15426 4.6875001,-0.81807 4.4921872,-0.51951 4.394531,-0.24549 4.394532,0.02 4.394531,0.28515 4.492187,0.55861 4.589844,0.83579 4.882813,1.15976 5.273437,1.52845 5.957031,2.00884 7.421875,2.79683 21.679688,8.35174 5.957031,1.90088 5.273438,1.40801 4.785156,1.01314 4.58984,0.70865 4.39454,0.4203 4.39453,0.15786 4.39453,-0.10822 4.39453,-0.37181 4.49219,-0.64359 4.6875,-0.93891 4.98046,-1.26952 5.46875,-1.67267 6.25,-2.19411 8.39844,-3.24885 15.72266,-6.11974 6.34765,-2.15551 5.46875,-1.58698 4.98047,-1.177 4.6875,-0.84177 4.49219,-0.5437 4.39453,-0.27 4.39453,-0.005 4.39453,0.26066 4.39454,0.52007 4.58984,0.80713 4.78516,1.10694 5.17578,1.46778 5.85937,1.94291 7.12891,2.6551 24.21875,9.26571 5.76172,1.7724 5.07812,1.29485 4.78516,0.95339 4.58984,0.64655 4.39453,0.35789 4.39453,0.094 4.39454,-0.17202 4.39453,-0.4341 4.49218,-0.70422 4.6875,-0.99735 5.07813,-1.35295 5.56641,-1.7603 6.54296,-2.35383 9.57032,-3.75581 12.30468,-4.7802 6.54297,-2.2497 5.56641,-1.63915 4.98047,-1.19953 4.6875,-0.86529 4.49219,-0.56778 4.39453,-0.29447 4.39453,-0.0295 4.39453,0.23613 4.39453,0.49635 4.58984,0.78381 0.39063,0.0787"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="2.5"
            stroke-dasharray=""
            id="path54"
            style="stroke: #ffffff; stroke-width: 1; stroke-dasharray: none; stroke-opacity: 1"
            mask="url(#mask58)"
          />
        </g>
        <g id="g35" transform="translate(-2.6525261,-0.7130375)">
          <rect
            style="
              fill: #ffffff;
              fill-opacity: 0.177622;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            id="rect28"
            width="19.585625"
            height="4.1574473"
            x="156.08421"
            y="212.76416"
          />
          <rect
            style="
              fill: #ffffff;
              fill-opacity: 0.34965;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            id="rect29"
            width="19.585625"
            height="4.1574473"
            x="156.08421"
            y="205.75665"
          />
          <rect
            style="
              fill: #ffffff;
              fill-opacity: 0.521678;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            id="rect30"
            width="19.585625"
            height="4.1574473"
            x="156.08421"
            y="198.74913"
          />
          <rect
            style="
              fill: #ffffff;
              fill-opacity: 0.797203;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            id="rect31"
            width="19.585625"
            height="4.1574473"
            x="156.08421"
            y="191.74162"
          />
          <rect
            style="
              fill: #ffffff;
              fill-opacity: 1;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            id="rect32"
            width="19.585625"
            height="4.1574473"
            x="156.08421"
            y="184.73412"
          />
          <rect
            style="
              fill: #ffffff;
              fill-opacity: 0.521678;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            id="rect33"
            width="19.585625"
            height="4.1574473"
            x="156.08421"
            y="177.72661"
          />
          <rect
            style="
              fill: #ffffff;
              fill-opacity: 0.34965;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            id="rect34"
            width="19.585625"
            height="4.1574473"
            x="156.08421"
            y="170.71909"
          />
          <rect
            style="
              fill: #ffffff;
              fill-opacity: 0.177622;
              stroke: none;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            id="rect35"
            width="19.585625"
            height="4.1574473"
            x="156.08421"
            y="163.71158"
          />
        </g>
        <image
          width="101.30386"
          height="105.00803"
          preserveAspectRatio="none"
          :xlink:href="imgOptions[`scr` + currentScreen]"
          id="image1"
          x="40.366531"
          y="40.496037"
          mask="url(#mask41)"
        />
        <path
          id="rect36"
          style="
            fill: #ffffff;
            fill-opacity: 0.0825175;
            stroke: #ffffff;
            stroke-width: 0.529;
            stroke-linecap: round;
            stroke-opacity: 0.521678;
          "
          d="M 20.637499,163.39119 H 146.71218 v 13.42045 L 136.525,187.72115 H 20.637499 Z"
        />
        <text
          xml:space="preserve"
          style="
            font-style: normal;
            font-variant: normal;
            font-weight: normal;
            font-stretch: normal;
            font-size: 8.46667px;
            font-family: Tungsten;
            -inkscape-font-specification: Tungsten;
            text-align: center;
            text-anchor: middle;
            fill: #ffffff;
            fill-opacity: 0.0825175;
            stroke: #ffffff;
            stroke-width: 0.529;
            stroke-linecap: round;
            stroke-dasharray: none;
            stroke-opacity: 0.521678;
          "
          x="83.784904"
          y="178.38828"
          id="text36"
        >
          <tspan
            id="tspan36"
            style="
              font-style: normal;
              font-variant: normal;
              font-weight: normal;
              font-stretch: normal;
              font-size: 8.46667px;
              font-family: DINNextW01-Regular;
              -inkscape-font-specification: DINNextW01-Regular;
              text-align: center;
              text-anchor: middle;
              fill: #ffffff;
              fill-opacity: 1;
              stroke: none;
              stroke-width: 0.529;
            "
            x="83.784904"
            y="178.38828"
          >
            {{ textOptions["scr" + currentScreen] || "Error" }}
          </tspan>
        </text>
        <g id="g37" transform="translate(14.687245,-0.26449998)">
          <path
            style="
              fill: none;
              fill-opacity: 1;
              stroke: #ffffff;
              stroke-width: 0.529;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.521678;
            "
            d="M 37.81552,163.12669 V 148.95828"
            id="path36"
          />
          <path
            id="rect37"
            style="
              fill: none;
              stroke: #ffffff;
              stroke-width: 1.029;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.92028;
            "
            d="M 20.637499,58.737498 42.462755,37.570831 H 132.02493 V 148.95827 H 20.637499 Z"
          />
          <path
            id="path37"
            style="
              fill: none;
              stroke: #ffffff;
              stroke-width: 0.944;
              stroke-linecap: round;
              stroke-dasharray: none;
              stroke-opacity: 0.345455;
            "
            d="M 26.15129,61.007555 45.815802,41.232538 H 126.51114 V 119.30354 L 101.3984,145.29656 H 26.15129 Z"
          />
        </g>
        <rect
          style="
            fill: #ffffff;
            fill-opacity: 0.213986;
            stroke: #ffffff;
            stroke-width: 0.557863;
            stroke-linecap: round;
            stroke-dasharray: none;
            stroke-opacity: 0.345455;
          "
          id="rect38"
          width="9.1282721"
          height="26.485481"
          x="168.45317"
          y="36.598763"
          @click="optionsOpen = true"
        />
        <rect
          style="
            fill: #ffffff;
            fill-opacity: 0.213986;
            stroke: #ffffff;
            stroke-width: 0.557863;
            stroke-linecap: round;
            stroke-dasharray: none;
            stroke-opacity: 0.345455;
          "
          id="rect40"
          width="9.1282721"
          height="26.485481"
          x="168.45317"
          y="68.825287"
          @click="currentScreen = currentScreen == 1 ? 2 : 1"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.stat-com-main {
  overflow: hidden;

  background-color: #706c68ff;
}

#svg1 {
  max-height: 100vh;
  max-width: 100vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  background-color: #706c68ff;
}

.options {
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  padding: 10px;

  background: radial-gradient(circle, rgba(33, 52, 66, 1) 5%, rgba(28, 66, 73, 1) 100%);
}
</style>

<script setup lang="ts">
import HeaderSmall from "@/components/HeaderSmall.vue";
import { UIButton, UIField } from "vct-tools-components";
import { ref } from "vue";

const optionsOpen = ref(false);
const currentScreen = ref(1);

const second = ref(0);
setInterval(() => {
  second.value = new Date().getSeconds();
});

const textOptions = ref<Record<string, string>>({
  scr1: "VALORANT",
  scr2: "VALORANT"
});

const imgOptions = ref<Record<string, string>>({
  scr1: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMzAwIDMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0RERERERCIvPjxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik03Mi4yOSAxNDAuMzk1djE1LjY0aC0zLjEybC02LjMyLTEwLjY5LS4wNi4wMXYxMC42OGgtMy4xNHYtMTUuNjRoMy4xNGw2LjMxIDEwLjY4LjA3LS4wMXYtMTAuNjdoMy4xMlptMi4yIDkuOTV2LS4yM3EwLTIuNiAxLjQ1LTQuMjYgMS40NS0xLjY2IDQuMDEtMS42NiAyLjU4IDAgNC4wNCAxLjY2IDEuNDYgMS42NSAxLjQ2IDQuMjZ2LjIzcTAgMi42Mi0xLjQ1IDQuMjctMS40NiAxLjY1LTQuMDIgMS42NS0yLjU4IDAtNC4wNC0xLjY1LTEuNDUtMS42NS0xLjQ1LTQuMjdabTMuMTItLjIzdi4yM3EwIDEuNTkuNTYgMi41NS41Ni45NiAxLjgxLjk2IDEuMjEgMCAxLjc3LS45Ny41Ny0uOTYuNTctMi41NHYtLjIzcTAtMS41NS0uNTctMi41Mi0uNTctLjk4LTEuOC0uOTgtMS4yMSAwLTEuNzcuOTgtLjU3Ljk4LS41NyAyLjUyWm0xOC41NS01Ljd2MTEuNjJoLTMuMTN2LTExLjYyaDMuMTNabTAtNS4xNHYyLjM1aC0zLjEzdi0yLjM1aDMuMTNabTIuNTggNS4xNGgyLjkxbC4xMyAxLjUzcS41Ni0uODMgMS40LTEuMjkuODUtLjQ2IDEuOTUtLjQ2IDEuMTIgMCAxLjkyLjUuNzkuNDkgMS4yIDEuNDkuNTQtLjk0IDEuNC0xLjQ2Ljg1LS41MyAyLjAxLS41MyAxLjcyIDAgMi43MiAxLjE5Ljk5IDEuMTkuOTkgMy42MXY3LjA0aC0zLjE0di03LjA1cTAtMS4zMi0uNDMtMS44My0uNDMtLjUyLTEuMjctLjUyLS42NyAwLTEuMTYuMy0uNDkuMjktLjc4LjgyIDAgLjIuMDEuMzUuMDEuMTQuMDEuMjl2Ny42NGgtMy4xMnYtNy4wNXEwLTEuMjktLjQzLTEuODJ0LTEuMjktLjUzcS0uNjMgMC0xLjExLjI0LS40OC4yNC0uNzkuNjh2OC40OGgtMy4xM3YtMTEuNjJabTI4Ljk5IDExLjYyaC0zLjEzcS0uMTctLjQtLjMtLjg0LS4xMi0uNDQtLjE3LS45LS40OS44NS0xLjI4IDEuNDEtLjc5LjU2LTEuODguNTYtMS44MyAwLTIuODItLjk0LS45OS0uOTQtLjk5LTIuNTcgMC0xLjcgMS4zMi0yLjY0IDEuMzItLjk0IDMuODQtLjk0aDEuNzV2LS45M3EwLS44NC0uNDQtMS4zLS40NC0uNDYtMS4zLS40Ni0uNzYgMC0xLjE3LjM3LS40Mi4zNy0uNDIgMS4wM2wtMy4wMy0uMDEtLjAxLS4wN3EtLjA3LTEuNDcgMS4yOC0yLjU0dDMuNTYtMS4wN3EyLjA4IDAgMy4zOCAxLjA2IDEuMyAxLjA2IDEuMyAzLjAxdjQuODFxMCAuODEuMTIgMS41My4xMy43Mi4zOSAxLjQzWm0tNi0yLjA5cS44MyAwIDEuNDctLjQxLjY1LS40MS44Ny0uOTV2LTEuNjRoLTEuNzVxLTEgMC0xLjUxLjUtLjUyLjUtLjUyIDEuMjEgMCAuNTguMzkuOTMuMzguMzYgMS4wNS4zNlptNy4zOC0zLjR2LS4yMnEwLTIuNzUgMS4yLTQuNDQgMS4yLTEuNjkgMy4zNS0xLjY5Ljk4IDAgMS43Mi40NHQxLjI3IDEuMjZsLjI1LTEuNDhoMi43MXYxMS41N3EwIDIuMjYtMS40OSAzLjUtMS40OSAxLjI0LTQuMTQgMS4yNC0uODggMC0xLjg3LS4yNC0uOTktLjI0LTEuODMtLjY2bC41OC0yLjM0cS43Mi4zNCAxLjQ3LjUyLjc0LjE4IDEuNjIuMTggMS4yOSAwIDEuOS0uNTQuNjEtLjU0LjYxLTEuNjd2LTEuMDZxLS41Mi42Ni0xLjIyIDEtLjY5LjM1LTEuNi4zNS0yLjEzIDAtMy4zMy0xLjU4LTEuMi0xLjU3LTEuMi00LjE0Wm0zLjE0LS4yMnYuMjJxMCAxLjUzLjUxIDIuNC41Mi44OCAxLjY4Ljg4LjcyIDAgMS4yMi0uMjcuNS0uMjYuOC0uNzZ2LTUuMDVxLS4zLS41My0uOC0uODItLjUtLjI5LTEuMi0uMjktMS4xNSAwLTEuNjggMS4wMnQtLjUzIDIuNjdabTE0LjkxIDUuOTRxLTIuNTIgMC00LjAyLTEuNjItMS41LTEuNjEtMS41LTQuMDl2LS40M3EwLTIuNTkgMS40Mi00LjI2IDEuNDItMS42OCAzLjgyLTEuNjcgMi4zNSAwIDMuNjUgMS40MiAxLjMgMS40MiAxLjMgMy44NHYxLjdoLTYuOTRsLS4wMi4wN3EuMDggMS4xNS43NyAxLjg5LjY4Ljc0IDEuODUuNzQgMS4wNCAwIDEuNzMtLjIxdDEuNS0uNjZsLjg1IDEuOTNxLS43MS41OC0xLjg2Ljk2LTEuMTUuMzktMi41NS4zOVptLS4yOC05LjY1cS0uODcgMC0xLjM4LjY3LS41LjY2LS42MiAxLjc1bC4wMy4wNWgzLjg1di0uMjhxMC0xLS40Ny0xLjU5LS40Ny0uNi0xLjQxLS42Wm0xOC41NCA2LjIycTAtLjUyLS41LS44OS0uNS0uMzgtMS44NS0uNjctMi4wNy0uNDItMy4xMS0xLjI0LTEuMDUtLjgyLTEuMDUtMi4yNCAwLTEuNSAxLjI2LTIuNTUgMS4yNi0xLjA1IDMuMzgtMS4wNSAyLjIyIDAgMy41NCAxLjA0IDEuMzEgMS4wNSAxLjI2IDIuNjRsLS4wMi4wNmgtMy4wM3EwLS43LS40NS0xLjE0LS40NC0uNDQtMS4zLS40NC0uNzYgMC0xLjIuMzctLjQzLjM3LS40My45MyAwIC41NC40NS44OC40Ni4zNSAxLjg2LjYxIDIuMTQuNDMgMy4xOSAxLjI3IDEuMDQuODMgMS4wNCAyLjI5IDAgMS41Ny0xLjM0IDIuNTYtMS4zNSAxLTMuNTUgMS0yLjMyIDAtMy42Ny0xLjE4dC0xLjI4LTIuNjhsLjAyLS4wN2gyLjg3cS4wMy45NC42MSAxLjM2LjU4LjQyIDEuNTIuNDIuODcgMCAxLjMyLS4zNS40Ni0uMzQuNDYtLjkzWm0xMC4yIDMuNDNxLTIuNTEgMC00LjAxLTEuNjItMS41MS0xLjYxLTEuNTEtNC4wOXYtLjQzcTAtMi41OSAxLjQzLTQuMjYgMS40Mi0xLjY4IDMuODEtMS42NyAyLjM2IDAgMy42NiAxLjQyIDEuMyAxLjQyIDEuMyAzLjg0djEuN2gtNi45NGwtLjAyLjA3cS4wOCAxLjE1Ljc2IDEuODkuNjkuNzQgMS44Ni43NCAxLjA0IDAgMS43My0uMjEuNjgtLjIxIDEuNS0uNjZsLjg1IDEuOTNxLS43MS41OC0xLjg2Ljk2LTEuMTUuMzktMi41Ni4zOVptLS4yOC05LjY1cS0uODcgMC0xLjM3LjY3LS41MS42Ni0uNjIgMS43NWwuMDMuMDVoMy44NHYtLjI4cTAtMS0uNDYtMS41OS0uNDctLjYtMS40Mi0uNlptMTAuMDgtNy4zNHYxNi43NmgtMy4xNHYtMTYuNzZoMy4xNFptNy43MiAxNi45OXEtMi41MSAwLTQuMDEtMS42Mi0xLjUxLTEuNjEtMS41MS00LjA5di0uNDNxMC0yLjU5IDEuNDMtNC4yNiAxLjQyLTEuNjggMy44MS0xLjY3IDIuMzYgMCAzLjY2IDEuNDIgMS4zIDEuNDIgMS4zIDMuODR2MS43aC02Ljk0bC0uMDIuMDdxLjA4IDEuMTUuNzYgMS44OS42OS43NCAxLjg2Ljc0IDEuMDQgMCAxLjczLS4yMS42OC0uMjEgMS41LS42NmwuODUgMS45M3EtLjcxLjU4LTEuODYuOTYtMS4xNS4zOS0yLjU2LjM5Wm0tLjI4LTkuNjVxLS44NyAwLTEuMzcuNjctLjUxLjY2LS42MiAxLjc1bC4wMy4wNWgzLjg0di0uMjhxMC0xLS40Ni0xLjU5LS40Ny0uNi0xLjQyLS42Wm0xMS42NiA3LjI0cS44NCAwIDEuMzQtLjQ5LjUxLS40OS41MS0xLjNoMi44NGwuMDQuMDZxLjA0IDEuNzYtMS4zMyAyLjk1LTEuMzcgMS4xOS0zLjQgMS4xOS0yLjYgMC00LjAxLTEuNjUtMS40LTEuNjQtMS40LTQuMjJ2LS4zMnEwLTIuNTcgMS40LTQuMjIgMS40LTEuNjYgNC0xLjY2IDIuMTUgMCAzLjQ2IDEuMjMgMS4zMiAxLjIyIDEuMjggMy4yMmwtLjAyLjA2aC0yLjg2cTAtLjktLjUtMS40OS0uNDktLjYtMS4zNi0uNi0xLjI1IDAtMS43Ni45Ny0uNTEuOTYtLjUxIDIuNDl2LjMycTAgMS41Ni41MSAyLjUxLjUxLjk1IDEuNzcuOTVabTcuMS0xMi4yOWgzLjE0djIuODVoMS45NXYyLjJoLTEuOTV2NS45MnEwIC42Ny4yOC45Ni4yOC4yOS43NS4yOS4yNSAwIC40Mi0uMDIuMTgtLjAzLjQyLS4wOWwuMjcgMi4yNnEtLjQ4LjE2LS45My4yNS0uNDUuMDgtLjk4LjA4LTEuNjIgMC0yLjQ5LS45LS44OC0uODktLjg4LTIuODJ2LTUuOTNoLTEuN3YtMi4yaDEuN3YtMi44NVptMTIuMjQgMTQuN3EtMi41MiAwLTQuMDItMS42Mi0xLjUxLTEuNjEtMS41MS00LjA5di0uNDNxMC0yLjU5IDEuNDMtNC4yNiAxLjQyLTEuNjggMy44Mi0xLjY3IDIuMzUgMCAzLjY1IDEuNDIgMS4zIDEuNDIgMS4zIDMuODR2MS43aC02Ljk0bC0uMDIuMDdxLjA4IDEuMTUuNzcgMS44OS42OC43NCAxLjg1Ljc0IDEuMDQgMCAxLjczLS4yMXQxLjUtLjY2bC44NSAxLjkzcS0uNzEuNTgtMS44Ni45Ni0xLjE1LjM5LTIuNTUuMzlabS0uMjgtOS42NXEtLjg3IDAtMS4zOC42Ny0uNS42Ni0uNjIgMS43NWwuMDMuMDVoMy44NXYtLjI4cTAtMS0uNDctMS41OS0uNDctLjYtMS40MS0uNlptNi4yOSAzLjkzdi0uMjJxMC0yLjc1IDEuMTktNC40NCAxLjE5LTEuNjkgMy4zNC0xLjY5Ljg4IDAgMS41Ny4zOC43LjM3IDEuMjMgMS4wN3YtNi4zN2gzLjE1djE2Ljc2aC0yLjdsLS4yNi0xLjQycS0uNTUuODEtMS4yOSAxLjIzLS43NS40Mi0xLjcyLjQyLTIuMTMgMC0zLjMyLTEuNTd0LTEuMTktNC4xNVptMy4xMy0uMjJ2LjIycTAgMS41My41MSAyLjQuNTIuODggMS42OC44OC42OCAwIDEuMTgtLjI4LjUxLS4yNy44My0uOHYtNC45NXEtLjMyLS41NS0uODItLjg1LS41LS4zMS0xLjE3LS4zMS0xLjE1IDAtMS42OCAxLjAydC0uNTMgMi42N1oiLz48L3N2Zz4=",
  scr2: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMzAwIDMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0RERERERCIvPjxwYXRoIGZpbGw9IiM5OTk5OTkiIGQ9Ik03Mi4yOSAxNDAuMzk1djE1LjY0aC0zLjEybC02LjMyLTEwLjY5LS4wNi4wMXYxMC42OGgtMy4xNHYtMTUuNjRoMy4xNGw2LjMxIDEwLjY4LjA3LS4wMXYtMTAuNjdoMy4xMlptMi4yIDkuOTV2LS4yM3EwLTIuNiAxLjQ1LTQuMjYgMS40NS0xLjY2IDQuMDEtMS42NiAyLjU4IDAgNC4wNCAxLjY2IDEuNDYgMS42NSAxLjQ2IDQuMjZ2LjIzcTAgMi42Mi0xLjQ1IDQuMjctMS40NiAxLjY1LTQuMDIgMS42NS0yLjU4IDAtNC4wNC0xLjY1LTEuNDUtMS42NS0xLjQ1LTQuMjdabTMuMTItLjIzdi4yM3EwIDEuNTkuNTYgMi41NS41Ni45NiAxLjgxLjk2IDEuMjEgMCAxLjc3LS45Ny41Ny0uOTYuNTctMi41NHYtLjIzcTAtMS41NS0uNTctMi41Mi0uNTctLjk4LTEuOC0uOTgtMS4yMSAwLTEuNzcuOTgtLjU3Ljk4LS41NyAyLjUyWm0xOC41NS01Ljd2MTEuNjJoLTMuMTN2LTExLjYyaDMuMTNabTAtNS4xNHYyLjM1aC0zLjEzdi0yLjM1aDMuMTNabTIuNTggNS4xNGgyLjkxbC4xMyAxLjUzcS41Ni0uODMgMS40LTEuMjkuODUtLjQ2IDEuOTUtLjQ2IDEuMTIgMCAxLjkyLjUuNzkuNDkgMS4yIDEuNDkuNTQtLjk0IDEuNC0xLjQ2Ljg1LS41MyAyLjAxLS41MyAxLjcyIDAgMi43MiAxLjE5Ljk5IDEuMTkuOTkgMy42MXY3LjA0aC0zLjE0di03LjA1cTAtMS4zMi0uNDMtMS44My0uNDMtLjUyLTEuMjctLjUyLS42NyAwLTEuMTYuMy0uNDkuMjktLjc4LjgyIDAgLjIuMDEuMzUuMDEuMTQuMDEuMjl2Ny42NGgtMy4xMnYtNy4wNXEwLTEuMjktLjQzLTEuODJ0LTEuMjktLjUzcS0uNjMgMC0xLjExLjI0LS40OC4yNC0uNzkuNjh2OC40OGgtMy4xM3YtMTEuNjJabTI4Ljk5IDExLjYyaC0zLjEzcS0uMTctLjQtLjMtLjg0LS4xMi0uNDQtLjE3LS45LS40OS44NS0xLjI4IDEuNDEtLjc5LjU2LTEuODguNTYtMS44MyAwLTIuODItLjk0LS45OS0uOTQtLjk5LTIuNTcgMC0xLjcgMS4zMi0yLjY0IDEuMzItLjk0IDMuODQtLjk0aDEuNzV2LS45M3EwLS44NC0uNDQtMS4zLS40NC0uNDYtMS4zLS40Ni0uNzYgMC0xLjE3LjM3LS40Mi4zNy0uNDIgMS4wM2wtMy4wMy0uMDEtLjAxLS4wN3EtLjA3LTEuNDcgMS4yOC0yLjU0dDMuNTYtMS4wN3EyLjA4IDAgMy4zOCAxLjA2IDEuMyAxLjA2IDEuMyAzLjAxdjQuODFxMCAuODEuMTIgMS41My4xMy43Mi4zOSAxLjQzWm0tNi0yLjA5cS44MyAwIDEuNDctLjQxLjY1LS40MS44Ny0uOTV2LTEuNjRoLTEuNzVxLTEgMC0xLjUxLjUtLjUyLjUtLjUyIDEuMjEgMCAuNTguMzkuOTMuMzguMzYgMS4wNS4zNlptNy4zOC0zLjR2LS4yMnEwLTIuNzUgMS4yLTQuNDQgMS4yLTEuNjkgMy4zNS0xLjY5Ljk4IDAgMS43Mi40NHQxLjI3IDEuMjZsLjI1LTEuNDhoMi43MXYxMS41N3EwIDIuMjYtMS40OSAzLjUtMS40OSAxLjI0LTQuMTQgMS4yNC0uODggMC0xLjg3LS4yNC0uOTktLjI0LTEuODMtLjY2bC41OC0yLjM0cS43Mi4zNCAxLjQ3LjUyLjc0LjE4IDEuNjIuMTggMS4yOSAwIDEuOS0uNTQuNjEtLjU0LjYxLTEuNjd2LTEuMDZxLS41Mi42Ni0xLjIyIDEtLjY5LjM1LTEuNi4zNS0yLjEzIDAtMy4zMy0xLjU4LTEuMi0xLjU3LTEuMi00LjE0Wm0zLjE0LS4yMnYuMjJxMCAxLjUzLjUxIDIuNC41Mi44OCAxLjY4Ljg4LjcyIDAgMS4yMi0uMjcuNS0uMjYuOC0uNzZ2LTUuMDVxLS4zLS41My0uOC0uODItLjUtLjI5LTEuMi0uMjktMS4xNSAwLTEuNjggMS4wMnQtLjUzIDIuNjdabTE0LjkxIDUuOTRxLTIuNTIgMC00LjAyLTEuNjItMS41LTEuNjEtMS41LTQuMDl2LS40M3EwLTIuNTkgMS40Mi00LjI2IDEuNDItMS42OCAzLjgyLTEuNjcgMi4zNSAwIDMuNjUgMS40MiAxLjMgMS40MiAxLjMgMy44NHYxLjdoLTYuOTRsLS4wMi4wN3EuMDggMS4xNS43NyAxLjg5LjY4Ljc0IDEuODUuNzQgMS4wNCAwIDEuNzMtLjIxdDEuNS0uNjZsLjg1IDEuOTNxLS43MS41OC0xLjg2Ljk2LTEuMTUuMzktMi41NS4zOVptLS4yOC05LjY1cS0uODcgMC0xLjM4LjY3LS41LjY2LS42MiAxLjc1bC4wMy4wNWgzLjg1di0uMjhxMC0xLS40Ny0xLjU5LS40Ny0uNi0xLjQxLS42Wm0xOC41NCA2LjIycTAtLjUyLS41LS44OS0uNS0uMzgtMS44NS0uNjctMi4wNy0uNDItMy4xMS0xLjI0LTEuMDUtLjgyLTEuMDUtMi4yNCAwLTEuNSAxLjI2LTIuNTUgMS4yNi0xLjA1IDMuMzgtMS4wNSAyLjIyIDAgMy41NCAxLjA0IDEuMzEgMS4wNSAxLjI2IDIuNjRsLS4wMi4wNmgtMy4wM3EwLS43LS40NS0xLjE0LS40NC0uNDQtMS4zLS40NC0uNzYgMC0xLjIuMzctLjQzLjM3LS40My45MyAwIC41NC40NS44OC40Ni4zNSAxLjg2LjYxIDIuMTQuNDMgMy4xOSAxLjI3IDEuMDQuODMgMS4wNCAyLjI5IDAgMS41Ny0xLjM0IDIuNTYtMS4zNSAxLTMuNTUgMS0yLjMyIDAtMy42Ny0xLjE4dC0xLjI4LTIuNjhsLjAyLS4wN2gyLjg3cS4wMy45NC42MSAxLjM2LjU4LjQyIDEuNTIuNDIuODcgMCAxLjMyLS4zNS40Ni0uMzQuNDYtLjkzWm0xMC4yIDMuNDNxLTIuNTEgMC00LjAxLTEuNjItMS41MS0xLjYxLTEuNTEtNC4wOXYtLjQzcTAtMi41OSAxLjQzLTQuMjYgMS40Mi0xLjY4IDMuODEtMS42NyAyLjM2IDAgMy42NiAxLjQyIDEuMyAxLjQyIDEuMyAzLjg0djEuN2gtNi45NGwtLjAyLjA3cS4wOCAxLjE1Ljc2IDEuODkuNjkuNzQgMS44Ni43NCAxLjA0IDAgMS43My0uMjEuNjgtLjIxIDEuNS0uNjZsLjg1IDEuOTNxLS43MS41OC0xLjg2Ljk2LTEuMTUuMzktMi41Ni4zOVptLS4yOC05LjY1cS0uODcgMC0xLjM3LjY3LS41MS42Ni0uNjIgMS43NWwuMDMuMDVoMy44NHYtLjI4cTAtMS0uNDYtMS41OS0uNDctLjYtMS40Mi0uNlptMTAuMDgtNy4zNHYxNi43NmgtMy4xNHYtMTYuNzZoMy4xNFptNy43MiAxNi45OXEtMi41MSAwLTQuMDEtMS42Mi0xLjUxLTEuNjEtMS41MS00LjA5di0uNDNxMC0yLjU5IDEuNDMtNC4yNiAxLjQyLTEuNjggMy44MS0xLjY3IDIuMzYgMCAzLjY2IDEuNDIgMS4zIDEuNDIgMS4zIDMuODR2MS43aC02Ljk0bC0uMDIuMDdxLjA4IDEuMTUuNzYgMS44OS42OS43NCAxLjg2Ljc0IDEuMDQgMCAxLjczLS4yMS42OC0uMjEgMS41LS42NmwuODUgMS45M3EtLjcxLjU4LTEuODYuOTYtMS4xNS4zOS0yLjU2LjM5Wm0tLjI4LTkuNjVxLS44NyAwLTEuMzcuNjctLjUxLjY2LS42MiAxLjc1bC4wMy4wNWgzLjg0di0uMjhxMC0xLS40Ni0xLjU5LS40Ny0uNi0xLjQyLS42Wm0xMS42NiA3LjI0cS44NCAwIDEuMzQtLjQ5LjUxLS40OS41MS0xLjNoMi44NGwuMDQuMDZxLjA0IDEuNzYtMS4zMyAyLjk1LTEuMzcgMS4xOS0zLjQgMS4xOS0yLjYgMC00LjAxLTEuNjUtMS40LTEuNjQtMS40LTQuMjJ2LS4zMnEwLTIuNTcgMS40LTQuMjIgMS40LTEuNjYgNC0xLjY2IDIuMTUgMCAzLjQ2IDEuMjMgMS4zMiAxLjIyIDEuMjggMy4yMmwtLjAyLjA2aC0yLjg2cTAtLjktLjUtMS40OS0uNDktLjYtMS4zNi0uNi0xLjI1IDAtMS43Ni45Ny0uNTEuOTYtLjUxIDIuNDl2LjMycTAgMS41Ni41MSAyLjUxLjUxLjk1IDEuNzcuOTVabTcuMS0xMi4yOWgzLjE0djIuODVoMS45NXYyLjJoLTEuOTV2NS45MnEwIC42Ny4yOC45Ni4yOC4yOS43NS4yOS4yNSAwIC40Mi0uMDIuMTgtLjAzLjQyLS4wOWwuMjcgMi4yNnEtLjQ4LjE2LS45My4yNS0uNDUuMDgtLjk4LjA4LTEuNjIgMC0yLjQ5LS45LS44OC0uODktLjg4LTIuODJ2LTUuOTNoLTEuN3YtMi4yaDEuN3YtMi44NVptMTIuMjQgMTQuN3EtMi41MiAwLTQuMDItMS42Mi0xLjUxLTEuNjEtMS41MS00LjA5di0uNDNxMC0yLjU5IDEuNDMtNC4yNiAxLjQyLTEuNjggMy44Mi0xLjY3IDIuMzUgMCAzLjY1IDEuNDIgMS4zIDEuNDIgMS4zIDMuODR2MS43aC02Ljk0bC0uMDIuMDdxLjA4IDEuMTUuNzcgMS44OS42OC43NCAxLjg1Ljc0IDEuMDQgMCAxLjczLS4yMXQxLjUtLjY2bC44NSAxLjkzcS0uNzEuNTgtMS44Ni45Ni0xLjE1LjM5LTIuNTUuMzlabS0uMjgtOS42NXEtLjg3IDAtMS4zOC42Ny0uNS42Ni0uNjIgMS43NWwuMDMuMDVoMy44NXYtLjI4cTAtMS0uNDctMS41OS0uNDctLjYtMS40MS0uNlptNi4yOSAzLjkzdi0uMjJxMC0yLjc1IDEuMTktNC40NCAxLjE5LTEuNjkgMy4zNC0xLjY5Ljg4IDAgMS41Ny4zOC43LjM3IDEuMjMgMS4wN3YtNi4zN2gzLjE1djE2Ljc2aC0yLjdsLS4yNi0xLjQycS0uNTUuODEtMS4yOSAxLjIzLS43NS40Mi0xLjcyLjQyLTIuMTMgMC0zLjMyLTEuNTd0LTEuMTktNC4xNVptMy4xMy0uMjJ2LjIycTAgMS41My41MSAyLjQuNTIuODggMS42OC44OC42OCAwIDEuMTgtLjI4LjUxLS4yNy44My0uOHYtNC45NXEtLjMyLS41NS0uODItLjg1LS41LS4zMS0xLjE3LS4zMS0xLjE1IDAtMS42OCAxLjAydC0uNTMgMi42N1oiLz48L3N2Zz4="
});

const fullscreen = () => {
  document.body.requestFullscreen();
};

const selectImg = (scr: 1 | 2) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgOptions.value[`scr${scr}`] = e.target?.result as string;
      };
      reader.readAsDataURL(target.files[0]);
    }
  };
  input.click();
};
</script>
