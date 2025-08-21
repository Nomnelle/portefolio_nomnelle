export type ScribbleTransitionProps = {
    active: boolean;
    duration?: number;
    size?: number;
    onEnd?: () => void;
}