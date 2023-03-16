import { types } from 'aries-bifold'

type CardLayoutOverlay10 = types.oca.CardLayoutOverlay10
type MetaOverlay = types.oca.MetaOverlay
type FormatOverlay = types.oca.FormatOverlay
type LabelOverlay = types.oca.LabelOverlay
type CaptureBaseOverlay = types.oca.CaptureBaseOverlay
type CharacterEncodingOverlay = types.oca.CharacterEncodingOverlay

export enum CREDENTIALS {
  ANIG_TEST = "Ep31SvFAetugFPe5CGzJxt:2:Attestation numérique d'identité gouvernemental (EXP):1.0",
}

const ANIGCaptureBase: CaptureBaseOverlay = {
  type: 'spec/overlays/character_encoding/1.0',
  captureBase: '',
  attributeCharacterEncoding: {
    Nom: 'utf-8',
    Prénom: 'utf-8',
    'Date de naissance': 'utf-8',
    'Nom du parent 1': 'utf-8',
    'Nom du parent 2': 'utf-8',
    "Date d'émission": 'utf-8',
    "Date d'expiration": 'utf-8',
    "Niveau d'identification": 'utf-8',
    Photo: 'base64',
  },
} as CharacterEncodingOverlay

const ANIGLabelOverlayFr: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'fr',
  attributeLabels: {
    Nom: 'Nom',
    Prénom: 'Prénom',
    'Date de naissance': 'Date de naissance',
    'Nom du parent 1': 'Nom du parent 1',
    'Nom du parent 2': 'Nom du parent 2',
    Photo: 'Photo',
  },
} as LabelOverlay

const ANIGLabelOverlayEn: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'en',
  attributeLabels: {
    Nom: 'Last Name',
    Prénom: 'First Name',
    'Date de naissance': 'Date of Birth',
    'Nom du parent 1': 'Parent 1 Name',
    'Nom du parent 2': 'Parent 2 Name',
    Photo: 'Photo',
  },
} as LabelOverlay

const ANIGFormatOverlay: FormatOverlay = {
  type: 'spec/overlays/format/1.0',
  captureBase: '',
  attributeFormats: {
    Nom: 'YY-MM-DD',
    Prénom: 'YY-MM-DD',
    'Date de naissance': 'YY-MM-DD',
    'Nom du parent 1': 'P[A-Z0-9]{1}',
    'Nom du parent 2': '[A-Z0-9]{9}',
    Photo: 'image/jpeg',
  },
} as FormatOverlay

const ANIGCardOverlay: CardLayoutOverlay10 = {
  type: 'spec/overlays/card_layout/1.0',
  imageSource:
    'data:image/png;base64,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',
  header: {
    imageSource:
      'data:image/png;base64,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',
    color: '#FFFFFF',
    backgroundColor: '#052D4F',
  },
  footer: {
    color: '#FFFFFF',
  },
} as CardLayoutOverlay10

const ANIGBundle = {
  captureBase: {
    captureBase: '',
    type: 'spec/capture_base/1.0',
    attributes: {
      Nom: 'Text',
      Prénom: 'Text',
      'Date de naissance': 'Date',
      'Nom du parent 1': 'Text',
      'Nom du parent 2': 'Text',
      "Date d'émission": 'Date',
      "Date d'expiration": 'Date',
      "Niveau d'identification": 'Text',
      Photo: 'Binary',
    },
  } as CaptureBaseOverlay,

  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'fr',
      name: 'ANIG',
      issuerName: 'Ministère de la cybersécurité et du numérique',
    } as MetaOverlay,
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'ANIG',
      issuerName: 'Ministry of Cybersecurity and Digital',
    } as MetaOverlay,
    ANIGCardOverlay,
    ANIGFormatOverlay,
    ANIGLabelOverlayFr,
    ANIGLabelOverlayEn,
    ANIGCaptureBase,
  ],
}

export default {
  [CREDENTIALS.ANIG_TEST]: ANIGBundle,
}