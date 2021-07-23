import React, {FunctionComponent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {useFieldArray} from "react-hook-form";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {getErrorClass, getErrors} from "../../../../lib/error/error";

interface PackageLinesProps {
  register: any;
  errors: any;
  control: any;
  index: number;
}

export const PackageLines: FunctionComponent<PackageLinesProps> = ({register, errors, control, index}) => {
  const {fields, append, remove} = useFieldArray({
    name: `packages.${index}.itemsIncluded`,
    control
  });
  
  return (
    <>
      <div className="py-3">
        What else do you offer
        <button className="float-right btn btn-outline-secondary btn-sm" type="button" onClick={() => {
          append('');
        }}><FontAwesomeIcon icon={faPlus} /></button>
      </div>
      {fields.map((item: any, i) => (
        <div className="mb-2" key={item.id}>
          <div className={`
            input-group
            ${getErrorClass(
              typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
              && typeof errors.packages[index].itemsIncluded !== 'undefined'
              && typeof errors.packages[index].itemsIncluded[i] !== 'undefined'
                ? errors.packages[index].itemsIncluded[i].description : undefined
            )}
          `}>
            <input type="text"
              className={`form-control ${getErrorClass(
                typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
                && typeof errors.packages[index].itemsIncluded !== 'undefined'
                && typeof errors.packages[index].itemsIncluded[i] !== 'undefined'
                  ? errors.packages[index].itemsIncluded[i].description : undefined
              )}`}
              placeholder="Package extras"
              {...register(`packages.${index}.itemsIncluded.${i}.description`)}
              defaultValue={item.description}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-danger" type="button" onClick={() => {
                remove(i)
              }}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
          {getErrors(
            typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
            && typeof errors.packages[index].itemsIncluded !== 'undefined'
            && typeof errors.packages[index].itemsIncluded[i] !== 'undefined'
              ? errors.packages[index].itemsIncluded[i].description : undefined
          )}
        </div>
      ))}
    </>
  );
};
