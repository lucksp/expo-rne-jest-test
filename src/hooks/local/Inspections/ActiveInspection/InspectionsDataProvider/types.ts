import { Dispatch } from 'react';
import { SWRResponse } from 'swr';

import type { Action, ACTIONS } from './actions';

/**
 * UI Layer
 */

export enum ComponentTypes {
  CHECKBOX = 'checkbox_input',
  DROPDOWN = 'dropdown_input',
  MULTISELECT = 'multiselect_input',
  RADIO = 'radio_input',
  SWITCH = 'switch_input',
  TEXT = 'text_input',
  TEXTAREA = 'textarea_input',
  NUMBER = 'number_input',
  SINGLE_IMAGE = 'single_image_input',
  MULTI_IMAGE = 'multi_image_input',
  FILE_INPUT = 'file_input',
  MULTI_FILE = 'files_input',
  VIDEO = 'video_input',
  DATE_PICKER = 'date_input',
  //   TIME_PICKER ='time-picker',
}

/**
 * Optional Form Fields for inputs with multiple values, such as:
 * Dropdown/MultiSelect, Checkbox, Radios
 *  @todo - Fix "create_step" form to give the user the ability to define options for a multi-select.
 */
export interface FormFieldOptions {
  linkedForm?: string;
  isSelected: boolean;
  label: string;
  order: number;
  uuid: string;
  value: string;
}

/**
 * All the details to make up up a single Field:
 * @param {string} name - Name of the step
 * @param {string} uuid - Step entry uuid
 * @param {string} kind - Step entry value of the formField labeled "Input Type"
 * @param {string} label - Step Title
 * @param {string} inputValue - user entered value
 * @param {array} formFieldOptions - see FormFieldOptions
 */
export interface FormField {
  defaultValue: string;
  formFieldOptions: FormFieldOptions[] | null;
  helperText: string;
  inputValue: string;
  isRequired: boolean;
  kind: ComponentTypes;
  label: string;
  order: number;
  placeholderValue: string;
  uuid: string;
}

/**
 * FormGroup contains all details to render full form UI
 * @param {array} formFields - see FormField
 * @param {string} label - title of Form
 * @param {string} name - Name of inspection
 * @param {string} uuid - In the case of the default monthly inspection it will be the inspection template entry uuid.
 */
export interface FormGroup {
  formFields: FormField[];
  isHidden: boolean;
  systemName: string;
  parentFormUUID: string;
  version: string;
  order: number;
  name: string;
  uuid: string;
}

export interface IssueGroup {
  formFields: FormField[];
  helperText: string;
  label: string;
  name: string;
  subText: string;
  uuid: string;
}

/**
 * Form is a "Section" with many steps, which are the `formGroups`
 * @param {string} name
 */
interface Form {
  formGroups: FormGroup[];
  name: string;
  uuid: string;
  systemName: string;
  parentFormUUID: string;
  version: string;
  order: number;
}

/**
 * The full Inspection based on `name` provided to API
 */
export type Inspection = Form;

export interface Context extends Pick<SWRResponse, 'isValidating' | 'mutate' | 'error'> {
  state: ReducerState;
  dispatch: Dispatch<Action>;
  inspectionData?: Inspection;
}

export interface ReducerState {
  [ACTIONS.SET_INSPECTION_NAME]: string | null;
}
