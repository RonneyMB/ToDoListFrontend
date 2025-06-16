import React from "react";
import Svg, { G, Path, Rect, ClipPath, Defs } from "react-native-svg";

interface PropsOfIcon {
  width?: number;
  height?: number;
  color?: string;
}

const LogoComponent = ({ width = 222.917, height = 212.475, color = "#F7374F" }: PropsOfIcon) => (
  <Svg width={width} height={height} viewBox="0 0 222.917 212.475">
    <Defs>
      <ClipPath id="clip-path">
        <Rect width={222.917} height={212.475} fill="none" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip-path)">
      <Path d="M0,79.4V24.354C0,9.8,9.8,0,24.5,0S49,9.8,49,24.354V79.4c0,14.554-9.8,24.353-24.5,24.353S0,93.957,0,79.4m33.72,0V24.354c0-6.341-3.6-9.944-9.223-9.944s-9.222,3.6-9.222,9.944V79.4c0,6.34,3.6,9.943,9.222,9.943s9.223-3.6,9.223-9.943" fill={color} />
      <Path d="M83.367,102.067,72.27,60.421H64.345v41.647H49.07V1.194H72.991c14.555,0,23.921,9.51,23.921,24.066v11.1c0,9.367-3.89,16.571-10.518,20.607l12.826,45.1ZM64.345,46.01H72.27c5.909,0,9.367-3.458,9.367-9.367V24.971c0-5.908-3.458-9.367-9.367-9.367H64.345Z" transform="translate(10.153 0.247)" fill={color} />
      <Path d="M129.353,32.856v-8.5c0-6.341-3.6-9.943-9.223-9.943s-9.222,3.6-9.222,9.943V79.4c0,6.34,3.6,9.944,9.222,9.944s9.223-3.6,9.223-9.944V61.533H120.13V47.121h24.5V79.4c0,14.554-9.8,24.353-24.5,24.353s-24.5-9.8-24.5-24.353V24.353C95.633,9.8,105.432,0,120.13,0s24.5,9.8,24.5,24.354v8.5Z" transform="translate(19.787 0)" fill={color} />
      <Path d="M175.064,79.731H158.636l-3.315,22.336H140.046L156.763,1.193h20.463L193.94,102.068H178.379Zm-2.018-14.7-6.2-42.221-6.2,42.221Z" transform="translate(28.977 0.247)" fill={color} />
      <Path d="M0,98.624H15.619L33.64,161.366V98.624H47.523v93.445H32.571l-18.688-59.8v59.8H0Z" transform="translate(0 20.406)" fill={color} />
      <Rect width={14.15} height={93.445} transform="translate(58.197 119.03)" fill={color} />
      <Path d="M108.365,110.638l-26.7,68.08h26.7v13.35H65.913V180.055l26.7-68.083h-26.7V98.624h42.452Z" transform="translate(13.638 20.406)" fill={color} />
      <Path d="M107.056,98.624h40.182v13.348H121.207V138H141.9v13.35H121.207v27.365h26.031v13.35H107.056Z" transform="translate(22.151 20.406)" fill={color} />
      <Path d="M177.981,192.069,167.7,153.489H160.36v38.58H146.209V98.624H168.37c13.481,0,22.159,8.809,22.159,22.293V131.2c0,8.676-3.605,15.351-9.746,19.09l11.882,41.783Zm-17.621-51.93H167.7c5.473,0,8.676-3.2,8.676-8.676V120.65c0-5.473-3.2-8.678-8.676-8.678H160.36Z" transform="translate(30.252 20.406)" fill={color} />
    </G>
  </Svg>
);

export default LogoComponent;
