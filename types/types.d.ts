declare module "react-native-textinput-effects" {
  import {
    TextInputProps,
    ViewStyle,
    StyleProp,
    TextStyle,
    EasingFunction,
  } from "react-native";

  class BaseClass<T extends CommonProps> extends React.Component<T> {
    inputRef(): TextInputProps;

    focus(): void;

    blur(): void;

    isFocused(): boolean;

    clear(): void;
  }

  interface CommonProps extends TextInputProps {
    label?: string;
    value?: string;
    defaultValue?: string;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    labelStyle?: StyleProp<TextStyle>;
    inputPadding?: number;
    easing?: EasingFunction;
    animationDuration?: number;
    editable?: boolean;
    height?: number;

    /* those are TextInput props which are overridden
     * so, i'm calling them manually
     */
    onBlur?: () => void;
    onFocus?: () => void;
    onChange?: () => void;
  }

  interface WithIconProps extends CommonProps {
    iconClass: React.ComponentClass<any, any>;
    iconName: string;
    iconColor?: string;
    iconSize?: number;
  }

  export interface AkiraProps extends CommonProps {
    borderColor?: string;
    labelHeight?: number;
  }

  class Akira extends BaseClass<AkiraProps> {}

  export interface FumiProps extends WithIconProps {
    passiveIconColor?: string;
  }

  class Fumi extends BaseClass<FumiProps> {}

  export interface HideoProps extends WithIconProps {
    iconBackgroundColor?: string;
  }

  class Hideo extends BaseClass<HideoProps> {}

  export interface HoshiProps extends CommonProps {
    maskColor?: string;
    borderColor?: string;
  }

  class Hoshi extends BaseClass<HoshiProps> {}

  export interface IsaoProps extends CommonProps {
    passiveColor?: string;
    /*
     * this is applied as active border and label color
     */
    activeColor?: string;
    /*
     * active border height
     */
    borderHeight?: number;
    labelHeight?: number;
  }

  class Isao extends BaseClass<IsaoProps> {}

  export interface JiroProps extends CommonProps {
    borderColor?: string;
  }

  class Jiro extends BaseClass<JiroProps> {}

  export interface KaedeProps extends CommonProps {}

  class Kaede extends BaseClass<KaedeProps> {}

  export interface KohanaProps extends WithIconProps {
    useNativeDriver?: boolean;
  }

  class Kohana extends BaseClass<KohanaProps> {}

  export interface MadokaProps extends CommonProps {
    borderColor?: string;
  }

  class Madoka extends BaseClass<MadokaProps> {}

  export interface MakikoProps extends WithIconProps {
    iconWidth?: number;
  }

  class Makiko extends BaseClass<MakikoProps> {}

  export interface SaeProps extends WithIconProps {
    iconName?: string;
    labelHeight?: number;
    borderHeight?: number;
  }

  class Sae extends BaseClass<SaeProps> {}

  export type TextInputEffectsProps =
    | AkiraProps
    | FumiProps
    | HideoProps
    | HoshiProps
    | IsaoProps
    | JiroProps
    | KaedeProps
    | KohanaProps
    | MadokaProps
    | MakikoProps
    | SaeProps;
}
