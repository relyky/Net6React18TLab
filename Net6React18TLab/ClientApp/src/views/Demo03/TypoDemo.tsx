import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FourKIcon from '@mui/icons-material/FourK'

//## resource: style object
const textIconCss = { fontSize: 'inherit', verticalAlign: 'text-top' };

export default function TypoDemo() {
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        h1. Heading 文件抬頭<FourKIcon sx={textIconCss} />與圖示
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading 文件抬頭<FourKIcon sx={textIconCss} />與圖示
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading 文件抬頭<FourKIcon sx={textIconCss} />與圖示
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading 文件抬頭<FourKIcon sx={textIconCss} />與圖示
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading 文件抬頭<FourKIcon sx={textIconCss} />與圖示
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. Heading 文件抬頭<FourKIcon sx={textIconCss} />與圖示
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur<br />
        成立於２００２年７月，<FourKIcon sx={textIconCss} />與圖示，致力於客製化的軟體專案開發、企業流程自動化及系統整合等服務給我們的客戶；並為個人金融服務業務、證券交易服務、知識入口網站及資訊部門業務流程等資訊科技整體解決方案之提供廠商。
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur<br />
        成立於２００２年７月，<FourKIcon sx={textIconCss} />與圖示，致力於客製化的軟體專案開發、企業流程自動化及系統整合等服務給我們的客戶；並為個人金融服務業務、證券交易服務、知識入口網站及資訊部門業務流程等資訊科技整體解決方案之提供廠商。
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.<br />
        成立於２００２年７月，<FourKIcon sx={textIconCss} />與圖示，致力於客製化的軟體專案開發、企業流程自動化及系統整合等服務給我們的客戶；並為個人金融服務業務、證券交易服務、知識入口網站及資訊部門業務流程等資訊科技整體解決方案之提供廠商。
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
        neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
        quasi quidem quibusdam.<br />
        成立於２００２年７月，<FourKIcon sx={textIconCss} />與圖示，致力於客製化的軟體專案開發、企業流程自動化及系統整合等服務給我們的客戶；並為個人金融服務業務、證券交易服務、知識入口網站及資訊部門業務流程等資訊科技整體解決方案之提供廠商。
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        button text <FourKIcon sx={textIconCss} />點擊按鈕
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text <FourKIcon sx={textIconCss} />小型標題
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text <FourKIcon sx={textIconCss} />上標文字
      </Typography>
    </Box>
  );
}