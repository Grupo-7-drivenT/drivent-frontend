import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useCreateTicket() {
  const token = useToken();

  const {
    loading: createTicketLoading,
    error: createTicketError,
    act: createTicket,
  } = useAsync((data) => ticketApi.createTicket(data, token), false);

  return {
    createTicketLoading,
    createTicketError,
    createTicket,
  };
}
