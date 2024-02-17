import { StrictMode } from 'react';

import './Header.css';

function Header(props: any) {
  return (
    <StrictMode>
      <div className="header-cont">
        <h6 className="inter-font-med">FLUENCY</h6>
        <p className="inter-font-med">{props.contentFluency}</p>
      </div>

      <div className="header-cont">
        <h6 className="inter-font-med">LANGUAGE</h6>
        <p className="inter-font-med">{props.contentLang}</p>
      </div>

      <div className="header-cont">
        <h6 className="inter-font-med">SOMETHING</h6>
        <p className="inter-font-med">{props.contentSmthn}</p>
      </div>
    </StrictMode>
  );
}

export default Header;
