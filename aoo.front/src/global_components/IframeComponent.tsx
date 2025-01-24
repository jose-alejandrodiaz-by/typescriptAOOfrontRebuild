// IframeComponent.tsx
import React from 'react';

interface IframeComponentProps {
  src: string;
}

const IframeComponent: React.FC<IframeComponentProps> = ({ src }) => {
  return (
    <iframe
      src={src}
      style={{ width: '100%', height: '100vh', border: 'none' }}
      title="External Page"
    ></iframe>
  );
};
//how to use
//<h1>Load External Page in an Iframe</h1>
//<IframeComponent src="https://app.powerbi.com/groups/me/reports/80475581-8836-49b0-8c1c-b2b8bbe5ccca/39f904f7cd631509e604?experience=power-bi" />
export default IframeComponent;
