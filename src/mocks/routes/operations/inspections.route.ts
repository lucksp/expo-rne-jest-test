import { rest } from 'msw';

import { formFixture } from '@/src/hooks/local/Inspections/ActiveInspection/InspectionsDataProvider/formFixture';
import { saveInspectionSuccessResponse } from '@/src/hooks/local/Inspections/ActiveInspection/saveInpsection.fixture';
import { ApiPath } from '@/src/hooks/routes';


export const inspectionHandlers = [
  rest.get(ApiPath.OPERATIONS_INSPECTIONS_TEMPLATE, (_req, res, ctx) => {
    return res(ctx.json(formFixture));
  }),
  rest.post(ApiPath.SAVE_INSPECTION, (req, res, ctx) => {
    console.log({ req });

    return res(ctx.json({ aggregateUUID: saveInspectionSuccessResponse }));
  }),
];
