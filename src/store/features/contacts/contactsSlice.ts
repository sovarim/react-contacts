import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';
import { RootState } from 'store';
import api from '../api/apiSlice';

export type ContactResponse = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type ContactRequest = Omit<ContactResponse, 'id'>;

const contactsAdapter = createEntityAdapter<ContactResponse>();

export const initialState = contactsAdapter.getInitialState();

const contactsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<EntityState<ContactResponse>, void>({
      query: () => 'contacts',
      transformResponse: (response: ContactResponse[]) =>
        contactsAdapter.setAll(initialState, response),
    }),
    createContact: builder.mutation<ContactResponse, ContactRequest>({
      query: (body) => ({
        body,
        url: 'contacts',
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data: contact } = await queryFulfilled;
          dispatch(
            contactsApi.util.updateQueryData('getContacts', undefined, (draft) => {
              contactsAdapter.addOne(draft, contact);
            }),
          );
        } catch {
          // pass
        }
      },
    }),
    deleteContact: builder.mutation<ContactResponse, number>({
      query: (id) => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          contactsApi.util.updateQueryData('getContacts', undefined, (draft) => {
            contactsAdapter.removeOne(draft, id);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateContact: builder.mutation<ContactResponse, ContactResponse>({
      query: ({ id, ...body }) => ({
        body,
        url: `contacts/${id}`,
        method: 'PATCH',
      }),
      onQueryStarted: async ({ id, ...body }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          contactsApi.util.updateQueryData('getContacts', undefined, (draft) => {
            contactsAdapter.updateOne(draft, { id, changes: body });
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const selectContactsResult = contactsApi.endpoints.getContacts.select();
export const selectContactsData = createSelector(
  selectContactsResult,
  (contactsResult) => contactsResult.data,
);
export const { selectById: selectContactById } = contactsAdapter.getSelectors(
  (state: RootState) => selectContactsData(state) ?? initialState,
);

export const { selectAll: selectAllContactsFromResultData } = contactsAdapter.getSelectors();

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
