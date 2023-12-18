import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { taskStatuses, taskStatusesAndColors } from "../../utils/constants";
import { m_taskList } from "../../mock/data";
import {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../../store/actions/taskActions";
// import { CustomerService } from "./service/CustomerService";

const TaskListComponent = () => {
  const dispatch = useDispatch();

  const toast = useRef(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [visible, setVisible] = useState(false);
  const [deleteTaskDialog, setDeleteTaskDialog] = useState(false);
  const [task, setTask] = useState(null);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [statuses] = useState(taskStatuses);

  const { tasks: _tasks } = useSelector((state) => state.tasks);

  const tasks = useMemo(() => {
    return _tasks;
  }, [_tasks]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string()
        .min(20, "Must be 20 characters or greater")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const { title, description } = values;
      dispatch(addTask(title, description));
      if (toast && toast.current)
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "New Task Created!",
          life: 3000,
        });
      setVisible(false);
    },
  });

  useEffect(() => {
    dispatch(getTasks());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickDeleteTask = () => {
    dispatch(deleteTask(task._id));
    if (toast && toast.current)
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Successfully Deleted!",
        life: 3000,
      });
    setDeleteTaskDialog(false);
    setTask(null);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const confirmDeleteTask = (task) => {
    setTask(task);
    setDeleteTaskDialog(true);
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        severity={
          taskStatusesAndColors.filter(
            (item) => item.status === rowData.status
          )[0].color
        }
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="cursor-pointer"
          onClick={() => confirmDeleteTask(rowData)}
        >
          <path
            fill="none"
            stroke="gray"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
          />
        </svg>
      </React.Fragment>
    );
  };

  const statusItemTemplate = (option) => {
    return (
      <Tag
        value={option}
        severity={
          taskStatusesAndColors.filter((item) => item.status === option)[0]
            .color
        }
      />
    );
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const onRowEditComplete = (e) => {
    let _tasks = [...tasks];
    let { newData, index } = e;

    _tasks[index] = newData;

    dispatch(updateTask(newData));
    // setTasks(_tasks);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return (
            <Tag
              value={option}
              severity={
                taskStatusesAndColors.filter(
                  (item) => item.status === option
                )[0].color
              }
            />
          );
        }}
      />
    );
  };

  const deleteTaskDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={() => setDeleteTaskDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={() => handleClickDeleteTask()}
      />
    </React.Fragment>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <div className="flex items center justify-center mb-3">
        <h3 className="text-3xl text-blue-500 font-bold">Task List</h3>
      </div>
      <div className="px-4">
        <div className="flex justify-between mb-2">
          <span className="p-input-icon-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m17 17l4 4M3 11a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
              />
            </svg>
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
          <button
            className="flex items-center justify-between bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 cursor-pointer"
            onClick={() => setVisible(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 12 12"
            >
              <path
                fill="white"
                d="M6.5 1.75a.75.75 0 0 0-1.5 0V5H1.75a.75.75 0 0 0 0 1.5H5v3.25a.75.75 0 0 0 1.5 0V6.5h3.25a.75.75 0 0 0 0-1.5H6.5z"
              />
            </svg>
            <span className="text-xl font-semibold ml-2">New Task</span>
          </button>
        </div>
        <DataTable
          value={_tasks}
          paginator
          onRowEditComplete={onRowEditComplete}
          rows={10}
          editMode="row"
          dataKey="_id"
          filters={filters}
          filterDisplay="row"
          loading={false}
          globalFilterFields={[
            "description",
            "title",
            "representative.name",
            "status",
          ]}
          emptyMessage="No tasks found."
        >
          <Column
            field="title"
            header="Title"
            filterField="title"
            editor={(options) => textEditor(options)}
            style={{ minWidth: "12rem" }}
            filter
            filterPlaceholder="Search by title"
          />
          <Column
            field="description"
            header="Description"
            filterField="description"
            editor={(options) => textEditor(options)}
            style={{ minWidth: "12rem" }}
            filter
            filterPlaceholder="Search by description"
          />
          <Column
            field="status"
            header="Status"
            showFilterMenu={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "12rem" }}
            editor={(options) => statusEditor(options)}
            body={statusBodyTemplate}
            filter
            filterElement={statusRowFilterTemplate}
          />
          <Column
            rowEditor
            bodyStyle={{ textAlign: "center", paddingRight: 0 }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            bodyStyle={{ textAlign: "center", paddingLeft: 0 }}
            exportable={false}
          ></Column>
        </DataTable>
      </div>
      <Dialog
        header="Create a Task"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ minWidth: "25vw" }}
      >
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                {...formik.getFieldProps("title")}
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-500 text-base">
                  {formik.errors.title}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
            </div>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                {...formik.getFieldProps("description")}
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-base">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sbmit
            </button>
          </div>
        </form>
      </Dialog>
      <Dialog
        visible={deleteTaskDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteTaskDialogFooter}
        onHide={() => setDeleteTaskDialog(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {task && (
            <span>
              Are you sure you want to delete <b>{task.title}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default TaskListComponent;
