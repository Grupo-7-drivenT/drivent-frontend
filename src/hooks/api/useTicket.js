import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicket() {
  const token = useToken();

  const {
    loading: getTicketLoading,
    error: getTicketError,
    act: getTicket,
  } = useAsync(() => ticketApi.getTicket(token));

  return {
    getTicketLoading,
    getTicketError,
    getTicket,
  };
}
