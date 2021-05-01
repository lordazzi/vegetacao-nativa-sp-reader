export interface EspecieMeta {
  nome?: string;

  /**
   * nomes populares separados por vírgula
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
