export interface EspecieMetaData {
  nome?: string;

  /**
   * Os nomes populares podem ser separados por vírgula (,), barra (/) e/ou espaço
   */
  nomePopular?: string;
  tamanho?: string;
  riscoExtincao?: boolean;
  rapidoRecobrimento?: boolean;

  /**
   * classe sucessional separada por barra
   */
  classeSucessional?: string;
  grupoFuncional?: string;
  sindromeDispersao?: string;

  /**
   * Lista de biomas separados por virgula
   */
  bioma?: string;
}
