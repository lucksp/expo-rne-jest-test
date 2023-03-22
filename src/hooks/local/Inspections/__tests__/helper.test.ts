import { mapOptionsFieldsToSubmit } from "../ActiveInspection/helper";

describe('ActiveInspection Helpers', () => {
  test('#mapOptionsFieldsToSubmit', () => {
    expect(
      mapOptionsFieldsToSubmit({
        data: {
          uuidSingleInput: 'plain string',
        },

        formUUID: 'i am main form UUID',
        formFieldUUID: 'I am step UUID',
      })
    ).toMatchInlineSnapshot(`
      Object {
        "formUUID": "i am main form UUID",
        "formValues": Array [
          Object {
            "formFieldUUID": "I am step UUID",
            "value": "plain string",
          },
        ],
      }
    `);

    expect(
      mapOptionsFieldsToSubmit({
        data: {
          uuidMultiInput1: ['true'],
        },

        formUUID: 'i am main form UUID',
        formFieldUUID: 'I am step UUID',
      })
    ).toMatchInlineSnapshot(`
      Object {
        "formUUID": "i am main form UUID",
        "formValues": Array [
          Object {
            "formFieldUUID": "I am step UUID",
            "value": "true",
          },
        ],
      }
    `);

    expect(
      mapOptionsFieldsToSubmit({
        data: {
          uuidMultiInput2: ['apple', 'banana', 'grape'],
        },

        formUUID: 'i am main form UUID',
        formFieldUUID: 'I am step UUID',
      })
    ).toMatchInlineSnapshot(`
      Object {
        "formUUID": "i am main form UUID",
        "formValues": Array [
          Object {
            "formFieldUUID": "I am step UUID",
            "value": "apple",
          },
          Object {
            "formFieldUUID": "I am step UUID",
            "value": "banana",
          },
          Object {
            "formFieldUUID": "I am step UUID",
            "value": "grape",
          },
        ],
      }
    `);
  });
});
