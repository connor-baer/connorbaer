import { animations, breakpoints, colors } from '../styles';

const Sidebar = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        padding: 1rem 1.5rem;
        transform: translateY(10%);
        transition: transform ${animations.short},
          visibility ${animations.short}, opacity ${animations.short};
        background-color: ${colors.white};
        opacity: 0;
        visibility: hidden;
        z-index: 9999;

        & .sidebar--open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        @media (min-width: ${breakpoints.medium}) {
          width: 20rem;
          transform: translateX(100%);
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        }
      }
    `}</style>
  </div>
);

export { Sidebar };
