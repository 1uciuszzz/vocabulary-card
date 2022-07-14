export interface User {
  id: string;
  username: string;
  role: string;
}

export interface AuthContextType {
  token: string;
  onSignIn: (payload: FormData) => void;
  onSignOut: () => void;
}

export interface Vocabulary {
  id: string;
  spelling: string;
  meaning: string;
  sentence: string;
  origin: string;
  add_date: string;
  mastered: boolean;
}

export interface GlobalState {
  user: User;
  vocabularies: Vocabulary[];
  currentVocabularyIndex: number;
  loading: boolean;
}

export interface stateContext {
  state: GlobalState;
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
}

export interface SideMenuVocabularies {
  phrase: string;
  vocabularies: Vocabulary[];
}
