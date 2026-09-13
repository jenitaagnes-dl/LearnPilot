from course_generator import generate_course


sample_text = """
Operating System is system software that manages computer hardware
and software resources.

The main functions of an operating system include process management,
memory management, file management, and device management.

Process management deals with creating, scheduling, and terminating
processes. Memory management manages the allocation and deallocation
of memory to programs.
"""


course = generate_course(sample_text)

print("\n===== GENERATED COURSE =====\n")
print(course)