import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

function PageFade({ children }) {
  const nodeRef = useRef(null); // щоб не було помилок, також уникаємо findDOMNode()

  return (
    <CSSTransition
      in={true}
      appear
      timeout={500}
      classNames="fade"
      nodeRef={nodeRef} // даємо CSSTransition посилання на DOM; це посилання буде активним
    >
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>
  );
}

export default PageFade;
