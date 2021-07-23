import React, {FunctionComponent} from "react";
import {getErrorClass, getErrors} from "../../../../lib/error/error";
import _ from "lodash";
import {useFieldArray} from "react-hook-form";
import {PackageLines} from "./package.lines";

interface PackageProps {
  register: any;
  errors: any;
  control: any;
}

export const Package: FunctionComponent<PackageProps> = ({register, errors, control}) => {
  const {fields} = useFieldArray({
    name: 'packages',
    control
  });
  return (
    <>
      {fields.map((item: any, index) => (
        <div className="col" key={item.id}>
          <div className="card">
            <div className="card-header">
              <input type="text"
                className={`form-control ${getErrorClass(
                  typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
                    ? errors.packages[index].name : undefined
                )}`}
                placeholder="Enter a package title"
                {...register(`packages.${index}.name`)}
                defaultValue={item.name}
              />
              {getErrors(
                typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
                  ? errors.packages[index].name : undefined
              )}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                  <textarea
                    className={`form-control ${getErrorClass(
                      typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
                        ? errors.packages[index].description : undefined
                    )}`}
                    placeholder="Description"
                    {...register(`packages.${index}.description`)}
                    defaultValue={item.description}
                  />
                {getErrors(
                  typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
                    ? errors.packages[index].description : undefined
                )}
              </li>
              <li className="list-group-item">
                <input type="text"
                  className={`form-control ${getErrorClass(
                    typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
                      ? errors.packages[index].price : undefined
                  )}`}
                  placeholder="Package price"
                  {...register(`packages.${index}.price`)}
                  defaultValue={item.price}
                />
                {getErrors(
                  typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
                    ? errors.packages[index].price : undefined
                )}
              </li>
              <li className="list-group-item">
                <select {...register(`packages.${index}.duration`)}
                  className={`form-control ${getErrorClass(
                    typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
                      ? errors.packages[index].duration : undefined
                  )}`}
                  defaultValue={item.duration}
                >
                  <option value="">When can you complete this task</option>
                  {_.range(30).map((item, index) => (
                    <option value={index + 1}>{index + 1}</option>
                  ))}
                </select>
                {getErrors(
                  typeof errors.packages !== 'undefined' && typeof errors.packages[index] !== 'undefined'
                    ? errors.packages[index].duration : undefined
                )}
              </li>
              <li className="list-group-item">
                <PackageLines register={register} errors={errors} control={control} index={index} />
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};