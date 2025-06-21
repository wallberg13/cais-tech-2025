// Client Module
export const CREATE_CLIENT_UNIQUE_ERROR: string = "create_client_unique_error";
export const CREATE_CLIENT_SUCCESS: string = "create_client_sucess";
export const CREATE_CLIENT_NOT_CONNETED_CLIENT: string =
  "create_client_not_connected_client";

// General errors
export const ERROR_TO_CLIENT: string = "error_database";
export const UNKNOWN_ERROR: string = "error_unknown";

const messages: { [key: string | number]: { [key: string | number]: string } } =
  {
    pt: {
      // Module API
      // Client
      [CREATE_CLIENT_UNIQUE_ERROR]: "Erro ao criar usuário, usuário já existe.",
      [CREATE_CLIENT_SUCCESS]: "Cliente criado com sucesso.",
      [CREATE_CLIENT_NOT_CONNETED_CLIENT]:
        "Não foi possível se conectar com o cliente, revise as credenciais",

      // Erros que não deveriam existir.
      // Suavisando mensagens
      [ERROR_TO_CLIENT]: "Erro ao realizar operação, converse com o suporte.",
      [UNKNOWN_ERROR]: "Erro interno, converse com o suporte.",
    },
  };

export function GetMessage(msgName: string, lang: string = "pt"): string {
  const messagesLang = messages[lang];

  return messagesLang[msgName] || "Unknown Message";
}
