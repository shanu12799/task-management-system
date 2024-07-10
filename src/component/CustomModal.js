import { Modal, Button, Input, SelectPicker } from "rsuite";

import { FilterOptions, TodoList } from "../constant";
import { useEffect, useState } from "react";

const CustomModal = ({ open, onSuccess, onEdit, onHandelClose }) => {
  const [taskDetails, setTaskDetails] = useState({});
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    if (typeof open === "object") {
      setEdit(true);
      setTaskDetails({ ...open });
    } else {
      setTaskDetails({});
    }
  }, [open]);
  return (
    <>
      <Modal open={open} onClose={() => onHandelClose()}>
        <Modal.Header>
          <Modal.Title>{isEdit ? "Edit task" : "Add task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label>Task name</label>
            <Input
              placeholder=""
              value={taskDetails.label}
              onChange={(value) =>
                setTaskDetails({ ...taskDetails, label: value })
              }
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label>Description</label>
            <Input
              as="textarea"
              rows={3}
              placeholder=""
              value={taskDetails.description}
              onChange={(value) =>
                setTaskDetails({ ...taskDetails, description: value })
              }
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label>Status</label>
            <SelectPicker
              block
              data={TodoList || []}
              searchable={false}
              style={{ width: "100%" }}
              placeholder="Select Status"
              value={taskDetails.status}
              onChange={(value) =>
                setTaskDetails({ ...taskDetails, status: value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() =>
              isEdit ? onEdit(taskDetails) : onSuccess(taskDetails)
            }
            appearance="primary"
          >
            {isEdit ? "Update" : "Submit"}
          </Button>
          <Button onClick={() => onHandelClose()} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
