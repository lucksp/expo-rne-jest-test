import produce from 'immer';

import { formFieldsWithStatus } from '../__fixture__/helper.fixture';
import { handleCheckStatus } from '../helper';
import { StepStatus } from '../types';

describe('InspectionProgressProvider', () => {
  test('#handleCheckStatus marks section complete if 1 required & 1 not required', () => {
    expect(
      handleCheckStatus([formFieldsWithStatus[0]], {
        status: StepStatus.COMPLETE,
        stepUuid: '937b23e4-6933-4cd4-b215-2b3e428c2324',
      })
    ).toMatchInlineSnapshot(
      `
      Array [
        Object {
          "formFields": Array [
            Object {
              "isRequired": true,
              "status": "complete",
              "uuid": "937b23e4-6933-4cd4-b215-2b3e428c2324",
            },
            Object {
              "isRequired": false,
              "status": "open",
              "uuid": "1d88c6ca-7f83-4ccc-8562-461b86f5ca4f",
            },
          ],
          "status": "complete",
          "uuid": "f8dbeab4-1b67-43e0-9719-b9ff461739d2",
        },
      ]
    `
    );
  });

  test('#handleCheckStatus keeps section open if all required are not complete', () => {
    expect(
      handleCheckStatus([formFieldsWithStatus[1]], {
        status: StepStatus.COMPLETE,
        stepUuid: 'bc5e8e27-ba02-4563-8697-44b57980ff83',
      })
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "formFields": Array [
            Object {
              "isRequired": true,
              "status": "complete",
              "uuid": "bc5e8e27-ba02-4563-8697-44b57980ff83",
            },
            Object {
              "isRequired": true,
              "status": "open",
              "uuid": "1d693d34-46af-4a1e-a582-ef26477b089d",
            },
            Object {
              "isRequired": true,
              "status": "open",
              "uuid": "faf3246c-a1bd-4a59-b277-7435a6169174",
            },
          ],
          "status": "open",
          "uuid": "eb7e38ff-1016-402c-a4e7-7440319227af",
        },
      ]
    `);
  });

  test('#handleCheckStatus marks section complete if all required', () => {
    const updatedStats = produce([formFieldsWithStatus[1]], draft => {
      draft[0].formFields[0].status = StepStatus.COMPLETE;
      draft[0].formFields[1].status = StepStatus.COMPLETE;
    });

    expect(
      handleCheckStatus(updatedStats, {
        status: StepStatus.COMPLETE,
        stepUuid: 'faf3246c-a1bd-4a59-b277-7435a6169174',
      })
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "formFields": Array [
            Object {
              "isRequired": true,
              "status": "complete",
              "uuid": "bc5e8e27-ba02-4563-8697-44b57980ff83",
            },
            Object {
              "isRequired": true,
              "status": "complete",
              "uuid": "1d693d34-46af-4a1e-a582-ef26477b089d",
            },
            Object {
              "isRequired": true,
              "status": "complete",
              "uuid": "faf3246c-a1bd-4a59-b277-7435a6169174",
            },
          ],
          "status": "complete",
          "uuid": "eb7e38ff-1016-402c-a4e7-7440319227af",
        },
      ]
    `);
  });
});
