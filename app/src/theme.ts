import {
  ImageAssets as BifoldImageAssets,
  IInputs,
  ITextTheme,
  IBrandColors,
  ISemanticColors,
  INotificationColors,
  IGrayscaleColors,
  IColorPallet,
  ITheme,
  IAssets,
} from '@hyperledger/aries-bifold-core'
import { IInlineInputMessage } from '@hyperledger/aries-bifold-core/App/theme'
import React from 'react'
import { StyleSheet } from 'react-native'

import EmptyIcon from './assets/img/icons/empty_icon.svg'
import Logo from './assets/img/logo-with-text.svg'

export const borderRadius = 4
export const heavyOpacity = 0.7
export const mediumOpacity = 0.5
export const lightOpacity = 0.35
export const zeroOpacity = 0.0
export const borderWidth = 2

const SemanticColors: ISemanticColors = {
  error: '#CB381F',
  success: '#4F813D',
  focus: '#DAE6F0',
}

const NotificationColors: INotificationColors = {
  success: '#4F813D',
  successBorder: '#C5CAD2',
  successIcon: '#223654',
  successText: '#223654',
  info: '#DAE6F0',
  infoBorder: '#C5CAD2',
  infoIcon: '#095797',
  infoText: '#223654',
  warn: '#F8E69A',
  warnBorder: '#C5CAD2',
  warnIcon: '#E0AD03',
  warnText: '#E0AD03',
  error: '#FFDBD6',
  errorBorder: '#C5CAD2',
  errorIcon: '#CB381F',
  errorText: '#CB381F',
  popupOverlay: `rgba(0, 0, 0, ${mediumOpacity})`,
}

const GrayscaleColors: IGrayscaleColors = {
  black: '#000000',
  darkGrey: '#4E5662',
  mediumGrey: '#6B778A',
  lightGrey: '#C5CAD2',
  veryLightGrey: '#F1F1F2',
  white: '#FFFFFF',
}

const BrandColors: IBrandColors = {
  primary: '#095797',
  primaryDisabled: `rgba(9, 87, 151, ${lightOpacity})`,
  secondary: '#DAE6F0',
  secondaryDisabled: `rgba(218, 230, 240, ${heavyOpacity})`,
  primaryLight: '#D9EAF7',
  highlight: '#E58271',
  primaryBackground: '#FFFFFF',
  secondaryBackground: '#FFFFFF',
  modalPrimaryBackground: '#FFFFFF',
  modalSecondaryBackground: '#F1F1F2',
  modalIcon: GrayscaleColors.darkGrey,
  link: '#095797',
  modalPrimary: '#095797',
  modalSecondary: '#FFFFFFFF',
  unorderedList: GrayscaleColors.darkGrey,
  unorderedListModal: GrayscaleColors.darkGrey,
  text: GrayscaleColors.white,
  icon: GrayscaleColors.white,
  headerIcon: GrayscaleColors.white,
  headerText: GrayscaleColors.white,
  buttonText: GrayscaleColors.white,
  tabBarInactive: GrayscaleColors.white,
  inlineError: NotificationColors.errorText,
  inlineWarning: NotificationColors.warnText,
}

export const ColorPallet: IColorPallet = {
  brand: BrandColors,
  semantic: SemanticColors,
  notification: NotificationColors,
  grayscale: GrayscaleColors,
}

export const TextTheme: ITextTheme = {
  headingOne: {
    fontFamily: 'BCSans-Regular',
    fontSize: 38,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  headingTwo: {
    fontFamily: 'BCSans-Regular',
    fontSize: 28,
    fontWeight: 'bold',
    color: ColorPallet.notification.infoText,
  },
  headingThree: {
    fontFamily: 'BCSans-Regular',
    fontSize: 26,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  headingFour: {
    fontFamily: 'BCSans-Regular',
    fontSize: 21,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  normal: {
    fontFamily: 'BCSans-Regular',
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  bold: {
    fontFamily: 'BCSans-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  label: {
    fontFamily: 'BCSans-Regular',
    fontSize: 14,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  labelTitle: {
    fontFamily: 'BCSans-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  labelSubtitle: {
    fontFamily: 'BCSans-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  labelText: {
    fontFamily: 'BCSans-Regular',
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: ColorPallet.grayscale.darkGrey,
  },
  caption: {
    fontFamily: 'BCSans-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  title: {
    fontFamily: 'BCSans-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorPallet.notification.infoText,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ColorPallet.brand.headerText,
  },
  modalNormal: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ColorPallet.grayscale.darkGrey,
  },
  modalHeadingOne: {
    fontSize: 38,
    color: ColorPallet.grayscale.darkGrey,
  },
  modalHeadingThree: {
    fontSize: 26,
    color: ColorPallet.grayscale.darkGrey,
  },
  popupModalText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  settingsText: {
    fontFamily: 'BCSans-Regular',
    fontSize: 21,
    fontWeight: 'normal',
    color: ColorPallet.grayscale.darkGrey,
  },
  inlineErrorText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: ColorPallet.brand.inlineError,
  },
  inlineWarningText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: ColorPallet.brand.inlineWarning,
  },
}

export const Inputs: IInputs = StyleSheet.create({
  label: {
    ...TextTheme.label,
  },
  textInput: {
    padding: 10,
    borderRadius,
    fontFamily: TextTheme.normal.fontFamily,
    fontSize: 16,
    backgroundColor: ColorPallet.grayscale.lightGrey,
    color: TextTheme.normal.color,
    borderWidth: 1,
    borderColor: ColorPallet.grayscale.lightGrey,
  },
  inputSelected: {
    borderColor: TextTheme.normal.color,
  },
  singleSelect: {
    padding: 12,
    borderRadius: borderRadius * 2,
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  singleSelectText: {
    ...TextTheme.normal,
  },
  singleSelectIcon: {
    color: ColorPallet.brand.text,
  },
  checkBoxColor: {
    color: ColorPallet.brand.primary,
  },
  checkBoxText: {
    ...TextTheme.normal,
  },
})

export const Buttons = StyleSheet.create({
  critical: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#D8292F',
  },
  primary: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.primary,
  },
  primaryDisabled: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.primaryDisabled,
  },
  primaryText: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
    textAlign: 'center',
  },
  primaryTextDisabled: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    color: ColorPallet.brand.text,
    textAlign: 'center',
  },
  secondary: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPallet.brand.primary,
  },
  secondaryDisabled: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPallet.brand.secondaryDisabled,
  },
  secondaryText: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    color: ColorPallet.brand.primary,
    textAlign: 'center',
  },
  secondaryTextDisabled: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    color: ColorPallet.brand.secondaryDisabled,
    textAlign: 'center',
  },
  modalCritical: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: '#D8292F',
  },
  modalPrimary: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: ColorPallet.brand.primary,
  },
  modalPrimaryText: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    textAlign: 'center',
    color: ColorPallet.brand.text,
  },
  modalSecondary: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: ColorPallet.brand.primary,
  },
  modalSecondaryText: {
    ...TextTheme.normal,
    fontWeight: 'bold',
    color: ColorPallet.brand.primary,
    textAlign: 'center',
  },
})

export const ListItems = StyleSheet.create({
  credentialBackground: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  credentialTitle: {
    ...TextTheme.headingFour,
  },
  credentialDetails: {
    ...TextTheme.caption,
  },
  credentialOfferBackground: {
    backgroundColor: ColorPallet.brand.modalPrimaryBackground,
  },
  credentialOfferTitle: {
    ...TextTheme.modalHeadingThree,
  },
  credentialOfferDetails: {
    ...TextTheme.normal,
  },
  revoked: {
    backgroundColor: ColorPallet.notification.error,
    borderColor: ColorPallet.notification.errorBorder,
  },
  contactBackground: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  credentialIconColor: {
    color: ColorPallet.notification.infoText,
  },
  contactTitle: {
    fontFamily: TextTheme.title.fontFamily,
    color: ColorPallet.grayscale.darkGrey,
  },
  contactDate: {
    fontFamily: TextTheme.normal.fontFamily,
    color: ColorPallet.grayscale.darkGrey,
    marginTop: 10,
  },
  contactIconBackground: {
    backgroundColor: ColorPallet.brand.primary,
  },
  contactIcon: {
    color: ColorPallet.brand.text,
  },
  recordAttributeLabel: {
    ...TextTheme.bold,
  },
  recordContainer: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  recordBorder: {
    borderBottomColor: ColorPallet.brand.primaryBackground,
  },
  recordLink: {
    color: ColorPallet.brand.link,
  },
  recordAttributeText: {
    ...TextTheme.normal,
  },
  proofIcon: {
    ...TextTheme.headingOne,
  },
  proofError: {
    color: ColorPallet.semantic.error,
  },
  proofListItem: {
    paddingHorizontal: 25,
    paddingTop: 16,
    backgroundColor: ColorPallet.brand.primaryBackground,
    borderTopColor: ColorPallet.brand.secondaryBackground,
    borderBottomColor: ColorPallet.brand.secondaryBackground,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  avatarText: {
    ...TextTheme.headingTwo,
    fontWeight: 'normal',
  },
  avatarCircle: {
    borderRadius: TextTheme.headingTwo.fontSize,
    borderColor: ColorPallet.grayscale.lightGrey,
    width: TextTheme.headingTwo.fontSize * 2,
    height: TextTheme.headingTwo.fontSize * 2,
  },
  emptyList: {
    ...TextTheme.normal,
  },
  requestTemplateBackground: {
    backgroundColor: ColorPallet.grayscale.white,
  },
  requestTemplateIconColor: {
    color: ColorPallet.notification.infoText,
  },
  requestTemplateTitle: {
    color: ColorPallet.grayscale.black,
    fontWeight: 'bold',
  },
  requestTemplateDetails: {
    color: ColorPallet.grayscale.black,
    fontWeight: 'normal',
  },
  requestTemplateZkpLabel: {
    color: ColorPallet.grayscale.mediumGrey,
  },
  requestTemplateIcon: {
    color: ColorPallet.grayscale.black,
  },
  requestTemplateDate: {
    color: ColorPallet.grayscale.mediumGrey,
  },
})

export const TabTheme = {
  tabBarStyle: {
    height: 80,
    backgroundColor: ColorPallet.brand.secondaryBackground,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    shadowColor: ColorPallet.grayscale.black,
    shadowOpacity: 0.1,
    borderTopWidth: 0,
    paddingBottom: 0,
    elevation: 6,
    zIndex: 6,
    gap: 8,
  },
  tabBarContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 6,
  },
  tabBarActiveTintColor: ColorPallet.brand.primary,
  tabBarInactiveTintColor: ColorPallet.notification.infoText,
  tabBarTextStyle: {
    ...TextTheme.label,
    fontWeight: 'normal',
    paddingVertical: 5,
    fontSize: 11,
    lineHeight: 12,
  },
  tabBarButtonIconStyle: {
    color: ColorPallet.grayscale.white,
  },
  focusTabIconStyle: {
    height: 60,
    width: 60,
    backgroundColor: ColorPallet.brand.primary,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusTabActiveTintColor: {
    backgroundColor: ColorPallet.brand.secondary,
  },
}

export const NavigationTheme = {
  dark: true,
  colors: {
    primary: ColorPallet.brand.primary,
    background: ColorPallet.brand.primaryBackground,
    card: ColorPallet.brand.primary,
    text: ColorPallet.brand.text,
    border: ColorPallet.grayscale.white,
    notification: ColorPallet.grayscale.white,
  },
}

export const HomeTheme = StyleSheet.create({
  welcomeHeader: {
    ...TextTheme.headingOne,
  },
  credentialMsg: {
    ...TextTheme.normal,
  },
  notificationsHeader: {
    ...TextTheme.headingThree,
  },
  noNewUpdatesText: {
    ...TextTheme.normal,
    color: ColorPallet.notification.infoText,
  },
  link: {
    ...TextTheme.normal,
    color: ColorPallet.brand.link,
  },
})

export const SettingsTheme = {
  groupHeader: {
    ...TextTheme.normal,
    marginBottom: 8,
  },
  groupBackground: ColorPallet.brand.secondaryBackground,
  iconColor: ColorPallet.grayscale.darkGrey,
  text: {
    ...TextTheme.caption,
    color: ColorPallet.grayscale.darkGrey,
  },
}

export const ChatTheme = {
  containerStyle: {
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
  },
  leftBubble: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
    borderRadius: 4,
    padding: 16,
    marginLeft: 16,
  },
  rightBubble: {
    backgroundColor: ColorPallet.brand.primaryLight,
    borderRadius: 4,
    padding: 16,
    marginRight: 16,
  },
  timeStyleLeft: {
    color: ColorPallet.grayscale.black,
    fontSize: 12,
    marginTop: 8,
  },
  timeStyleRight: {
    color: ColorPallet.grayscale.black,
    fontSize: 12,
    marginTop: 8,
  },
  leftText: {
    color: ColorPallet.grayscale.black,
    fontSize: TextTheme.normal.fontSize,
  },
  leftTextHighlighted: {
    color: ColorPallet.grayscale.black,
    fontSize: TextTheme.normal.fontSize,
    fontWeight: 'bold',
  },
  rightText: {
    color: ColorPallet.grayscale.black,
    fontSize: TextTheme.normal.fontSize,
  },
  rightTextHighlighted: {
    color: ColorPallet.grayscale.black,
    fontSize: TextTheme.normal.fontSize,
    fontWeight: 'bold',
  },
  inputToolbar: {
    backgroundColor: ColorPallet.brand.secondary,
    shadowColor: ColorPallet.brand.primaryDisabled,
    borderRadius: 10,
  },
  inputText: {
    lineHeight: undefined,
    fontWeight: '500',
    fontSize: TextTheme.normal.fontSize,
    color: ColorPallet.brand.primary,
  },
  placeholderText: ColorPallet.grayscale.lightGrey,
  sendContainer: {
    marginBottom: 4,
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  sendEnabled: ColorPallet.brand.primary,
  sendDisabled: ColorPallet.brand.primaryDisabled,
  options: ColorPallet.brand.primary,
  optionsText: ColorPallet.grayscale.black,
  openButtonStyle: {
    borderRadius: 32,
    backgroundColor: ColorPallet.brand.primary,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
  },
  openButtonTextStyle: {
    color: ColorPallet.brand.secondary,
    fontSize: TextTheme.normal.fontSize,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  documentIconContainer: {
    backgroundColor: ColorPallet.brand.primary,
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  documentIcon: {
    color: ColorPallet.grayscale.white,
  },
}

export const OnboardingTheme = {
  container: {
    backgroundColor: ColorPallet.brand.primaryBackground,
  },
  carouselContainer: {
    backgroundColor: ColorPallet.brand.primaryBackground,
  },
  pagerDot: {
    borderColor: ColorPallet.brand.primary,
  },
  pagerDotActive: {
    color: ColorPallet.brand.primary,
  },
  pagerDotInactive: {
    color: ColorPallet.brand.secondary,
  },
  pagerNavigationButton: {
    color: ColorPallet.brand.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerTintColor: ColorPallet.grayscale.white,
  headerText: {
    ...TextTheme.headingTwo,
    color: ColorPallet.notification.infoText,
  },
  bodyText: {
    ...TextTheme.normal,
    color: ColorPallet.notification.infoText,
  },
  imageDisplayOptions: {
    fill: ColorPallet.notification.infoText,
  },
}

export const DialogTheme = {
  modalView: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
  },
  titleText: {
    color: ColorPallet.grayscale.white,
  },
  description: {
    color: ColorPallet.grayscale.white,
  },
  closeButtonIcon: {
    color: ColorPallet.grayscale.white,
  },
  carouselButtonText: {
    color: ColorPallet.grayscale.white,
  },
}

const LoadingTheme = {
  backgroundColor: ColorPallet.brand.primary,
}
const PINEnterTheme = {
  image: {
    alignSelf: 'center',
    marginBottom: 20,
  },
}
const PINInputTheme = {
  cell: {
    backgroundColor: ColorPallet.brand.secondaryBackground,
    borderColor: ColorPallet.brand.secondary,
    borderWidth: 1,
  },
  focussedCell: {
    borderColor: '#3399FF',
  },
  cellText: {
    color: ColorPallet.grayscale.darkGrey,
  },
  icon: {
    color: ColorPallet.grayscale.darkGrey,
  },
  codeFieldRoot: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelAndFieldContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
    backgroundColor: ColorPallet.brand.secondaryBackground,
    borderColor: ColorPallet.notification.successText,
    borderWidth: 1,
  },
}

export const Assets: IAssets = {
  ...BifoldImageAssets,
  svg: { ...BifoldImageAssets.svg, logo: Logo as React.FC },
  img: {
    logoSecondary: {
      src: require('./assets/img/logo-large.png'),
      aspectRatio: 1,
      height: 120,
      width: 120,
      resizeMode: 'contain',
    },
    logoPrimary: {
      src: require('./assets/img/logo-large-white.png'),
      height: 170,
      width: 170,
    },
  },
}

const InputInlineMessage: IInlineInputMessage = {
  inlineErrorText: { ...TextTheme.inlineErrorText },
  InlineErrorIcon: EmptyIcon,
  inlineWarningText: { ...TextTheme.inlineWarningText },
  InlineWarningIcon: EmptyIcon,
}

interface IShadowTheme {
  elevationOne: {
    shadowColor: string
    shadowOffset: {
      width: number
      height: number
    }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
  elevationTwo: {
    shadowColor: string
    shadowOffset: {
      width: number
      height: number
    }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
  elevationThree: {
    shadowColor: string
    shadowOffset: {
      width: number
      height: number
    }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
  elevationFour: {
    shadowColor: string
    shadowOffset: {
      width: number
      height: number
    }
    shadowOpacity: number
    shadowRadius: number
    elevation: number
  }
}

export const ShadowTheme: IShadowTheme = {
  elevationOne: {
    shadowColor: ColorPallet.notification.infoText,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 2,
  },
  elevationTwo: {
    shadowColor: ColorPallet.notification.infoText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 8,
    elevation: 4,
  },
  elevationThree: {
    shadowColor: ColorPallet.notification.infoText,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 8,
  },
  elevationFour: {
    shadowColor: ColorPallet.notification.infoText,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 12,
  },
}

export const defaultTheme: ITheme = {
  ColorPallet,
  TextTheme,
  Buttons,
  heavyOpacity,
  borderRadius,
  borderWidth,
  Inputs,
  ListItems,
  TabTheme,
  NavigationTheme,
  HomeTheme,
  SettingsTheme,
  ChatTheme,
  OnboardingTheme,
  DialogTheme,
  LoadingTheme,
  PINEnterTheme,
  PINInputTheme,
  Assets,
  InputInlineMessage,
}
