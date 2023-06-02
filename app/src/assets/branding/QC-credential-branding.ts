import { types } from 'aries-bifold'

type CardLayoutOverlay11 = types.oca.CardLayoutOverlay11
type MetaOverlay = types.oca.MetaOverlay
type FormatOverlay = types.oca.FormatOverlay
type LabelOverlay = types.oca.LabelOverlay
type CaptureBaseOverlay = types.oca.CaptureBaseOverlay
type CharacterEncodingOverlay = types.oca.CharacterEncodingOverlay

export enum CREDENTIALS {
  ANIG_TEST = "Ep31SvFAetugFPe5CGzJxt:2:Attestation numérique d'identité gouvernemental (EXP):1.0",
  CQEN_DEMO = 'FUKLxsjrYSHgScLbHuPTo4:2:CQENDroitAccesVirtuel:0.1',
  ANIG_L = 'Ep31SvFAetugFPe5CGzJxt:2:ANIG:1.1',
  ADRESSE_L = 'Ep31SvFAetugFPe5CGzJxt:2:Adresse:1.1',
  PHOTO_L = 'Ep31SvFAetugFPe5CGzJxt:2:Photo:1.1',
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

const CQENCaptureBase: CaptureBaseOverlay = {
  type: 'spec/overlays/character_encoding/1.0',
  captureBase: '',
  attributeCharacterEncoding: {
    email: 'utf-8',
    time: 'utf-8',
  },
} as CharacterEncodingOverlay

const ANIG_LCaptureBase: CaptureBaseOverlay = {
  type: 'spec/overlays/character_encoding/1.0',
  captureBase: '',
  attributeCharacterEncoding: {
    given_names: 'utf-8',
    family_name: 'utf-8',
  },
} as CharacterEncodingOverlay

const ADRESSE_LCaptureBase: CaptureBaseOverlay = {
  type: 'spec/overlays/character_encoding/1.0',
  captureBase: '',
  attributeCharacterEncoding: {
    region: 'utf-8',
    locality: 'utf-8',
    postal_code: 'utf-8',
    country: 'utf-8',
    street_address: 'utf-8',
  },
} as CharacterEncodingOverlay

const PHOTO_LCaptureBase: CaptureBaseOverlay = {
  type: 'spec/overlays/character_encoding/1.0',
  captureBase: '',
  attributeCharacterEncoding: {
    picture: 'base64',
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

const CQENLabelOverlayFr: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'fr',
  attributeLabels: {
    email: 'Courriel',
    time: "Date d'émission",
  },
}

const CQENLabelOverlayEn: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'en',
  attributeLabels: {
    email: 'Email',
    time: 'Issuing date',
  },
}

const ANIG_LLabelOverlayFr: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'fr',
  attributeLabels: {
    given_names: 'Prénom',
    family_name: 'Nom',
  },
} as LabelOverlay

const ANIG_LLabelOverlayEn: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'en',
  attributeLabels: {
    given_names: 'First Name',
    family_name: 'Last Name',
  },
} as LabelOverlay

const ADRESSE_LLabelOverlayFr: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'fr',
  attributeLabels: {
    region: 'Région',
    locality: 'Ville',
    postal_code: 'Code postal',
    country: 'Pays',
    street_address: 'Adresse',
  },
} as LabelOverlay

const ADRESSE_LLabelOverlayEn: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'en',
  attributeLabels: {
    region: 'Region',
    locality: 'City',
    postal_code: 'Postal Code',
    country: 'Country',
    street_address: 'Address',
  },
} as LabelOverlay

const PHOTO_LLabelOverlayFr: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'fr',
  attributeLabels: {
    picture: 'Photo',
  },
} as LabelOverlay

const PHOTO_LLabelOverlayEn: LabelOverlay = {
  type: 'spec/overlays/label/1.0',
  captureBase: '',
  language: 'en',
  attributeLabels: {
    picture: 'Photo',
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

const CQENFormatOverlay: FormatOverlay = {
  captureBase: '',
  type: 'spec/overlays/format/1.0',
  attributeFormats: {
    email: '[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}',
    time: 'YY-MM-DD [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6}',
  },
}

const PHOTO_LFormatOverlay: FormatOverlay = {
  type: 'spec/overlays/format/1.0',
  captureBase: '',
  attributeFormats: {
    picture: 'image/jpeg',
  },
} as FormatOverlay

const ANIGCardOverlay: CardLayoutOverlay11 = {
  type: 'spec/overlays/card_layout/1.1',
  captureBase: '',
  logo: {
    src: require('./logo-quebec.png'),
  },
  primaryBackgroundColor: '#FFFFFF',
  secondaryBackgroundColor: '#095797',
  backgroundImage: {
    src: require('./carte-anig-demo.png'),
  },
} as CardLayoutOverlay11

const CQENCardOverlay: CardLayoutOverlay11 = {
  type: 'spec/overlays/card_layout/1.1',
  captureBase: '',
  logo: {
    src: require('./logo-quebec.png'),
  },
  primaryBackgroundColor: '#F9F9F9',
  secondaryBackgroundColor: '#757575',
  backgroundImage: {
    src: require('./CQEN-background.png'),
  },
} as CardLayoutOverlay11

const ANIG_LCardOverlay: CardLayoutOverlay11 = {
  type: 'spec/overlays/card_layout/1.1',
  captureBase: '',
  logo: {
    src: require('./logo-quebec.png'),
  },
  primaryBackgroundColor: '#FFFFFF',
  secondaryBackgroundColor: '#095797',
  backgroundImage: {
    src: require('./carte-anig-demo.png'),
  },
} as CardLayoutOverlay11

const ADRESSE_LCardOverlay: CardLayoutOverlay11 = {
  type: 'spec/overlays/card_layout/1.1',
  captureBase: '',
  logo: {
    src: require('./logo-quebec.png'),
  },
  primaryBackgroundColor: '#FFFFFF',
  secondaryBackgroundColor: '#095797',
  backgroundImage: {
    src: require('./carte-anig-demo.png'),
  },
} as CardLayoutOverlay11

const PHOTO_LCardOverlay: CardLayoutOverlay11 = {
  type: 'spec/overlays/card_layout/1.1',
  captureBase: '',
  logo: {
    src: require('./logo-quebec.png'),
  },
  primaryBackgroundColor: '#FFFFFF',
  secondaryBackgroundColor: '#095797',
  backgroundImage: {
    src: require('./carte-anig-demo.png'),
  },
} as CardLayoutOverlay11

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

const CQENBundle = {
  captureBase: {
    captureBase: '',
    type: 'spec/capture_base/1.0',
    attributes: {
      email: 'Email',
      time: 'Issuance timestamp',
    },
  } as CaptureBaseOverlay,
  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'fr',
      name: 'Port-E',
      issuerName: "Centre Québécois d'Excellence Numérique",
    } as MetaOverlay,
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'Port-E',
      issuerName: "Quebec's Digital Center of Excellence",
    } as MetaOverlay,
    CQENCaptureBase,
    CQENLabelOverlayFr,
    CQENLabelOverlayEn,
    CQENFormatOverlay,
    CQENCardOverlay,
  ],
}

const ANIG_LBundle = {
  captureBase: {
    captureBase: '',
    type: 'spec/capture_base/1.0',
    attributes: {
      given_names: 'Text',
      family_name: 'Text',
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
    ANIG_LCaptureBase,
    ANIG_LLabelOverlayFr,
    ANIG_LLabelOverlayEn,
    ANIG_LCardOverlay,
  ],
}

const ADRESSE_LBundle = {
  captureBase: {
    captureBase: '',
    type: 'spec/capture_base/1.0',
    attributes: {
      street_address: 'Text',
      locality: 'Text',
      postal_code: 'Text',
      country: 'Text',
      region: 'Text',
    },
  } as CaptureBaseOverlay,
  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'fr',
      name: 'Adresse',
      issuerName: 'Ministère de la cybersécurité et du numérique',
    } as MetaOverlay,
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'Address',
      issuerName: 'Ministry of Cybersecurity and Digital',
    } as MetaOverlay,
    ADRESSE_LCaptureBase,
    ADRESSE_LLabelOverlayFr,
    ADRESSE_LLabelOverlayEn,
    ADRESSE_LCardOverlay,
  ],
}

const PHOTO_LBundle = {
  captureBase: {
    captureBase: '',
    type: 'spec/capture_base/1.0',
    attributes: {
      picture: 'Binary',
    },
  } as CaptureBaseOverlay,
  overlays: [
    {
      type: 'spec/overlays/meta/1.0',
      language: 'fr',
      name: 'Photo',
      issuerName: 'Ministère de la cybersécurité et du numérique',
    } as MetaOverlay,
    {
      type: 'spec/overlays/meta/1.0',
      language: 'en',
      name: 'Photo',
      issuerName: 'Ministry of Cybersecurity and Digital',
    } as MetaOverlay,
    PHOTO_LCaptureBase,
    PHOTO_LLabelOverlayFr,
    PHOTO_LLabelOverlayEn,
    PHOTO_LFormatOverlay,
    PHOTO_LCardOverlay,
  ],
}

export default {
  [CREDENTIALS.ANIG_TEST]: ANIGBundle,
  [CREDENTIALS.CQEN_DEMO]: CQENBundle,
  [CREDENTIALS.ANIG_L]: ANIG_LBundle,
  [CREDENTIALS.ADRESSE_L]: ADRESSE_LBundle,
  [CREDENTIALS.PHOTO_L]: PHOTO_LBundle,
}
