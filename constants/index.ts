export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Certidão de Nascimento",
  "Carteira de Motorista (CNH)",
  "Cartão do SUS",
  "Carteira de Identidade Militar",
  "Carteira de Identidade (RG)",
  "Passaporte",
  "Registro Nacional de Estrangeiro (RNE)",
  "Carteira de Trabalho e Previdência Social (CTPS)",
  "Título de Eleitor",
  "Carteira de Identidade Estudantil",
  "Carteira Funcional",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Drauzio Varella",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Adib Jatene",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Mauro Escobar",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "José Gomes Temporão",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Anna Carla",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Lúcio Flávio",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Paula Niemeyer",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Luiza Santini",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Jorge Moll",
  },
];

export const StatusIcon = {
  scheduled: "assets/icons/check.svg",
  pending: "assets/icons/pending.svg",
  cancelled: "assets/icons/cancelled.svg",
};

